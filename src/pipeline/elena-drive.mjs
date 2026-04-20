// Drive/Docs access for Elena's daily editorial pipeline.
//
// Elena writes her pieces in Gemini Deep Research → Export to Google Doc.
// Those docs land in a specific Drive folder shared with the `elena-ingest`
// service account. This module is the thin client layer: list new docs,
// fetch their markdown. All parsing of the markdown lives in elena-docmd.mjs.
//
// Auth: GOOGLE_SERVICE_ACCOUNT_JSON env var (full JSON key body as a string)
// OR a path to a key file via GOOGLE_APPLICATION_CREDENTIALS. The env-var
// form is what the GitHub Actions workflow uses — the key lives in a secret.

import { google } from 'googleapis';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/documents.readonly',
];

function resolveAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    // Write the JSON to a tempfile so GoogleAuth can load it. Supports either
    // the raw JSON body or a base64-wrapped version (Actions secrets tolerate
    // either; we accept both to be forgiving).
    const decoded = raw.trim().startsWith('{')
      ? raw
      : Buffer.from(raw, 'base64').toString('utf8');
    const tmp = path.join(os.tmpdir(), `elena-sa-${process.pid}.json`);
    fs.writeFileSync(tmp, decoded, { mode: 0o600 });
    return new google.auth.GoogleAuth({ keyFile: tmp, scopes: SCOPES });
  }
  const fileEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (fileEnv && fs.existsSync(fileEnv)) {
    return new google.auth.GoogleAuth({ keyFile: fileEnv, scopes: SCOPES });
  }
  // Local default.
  const local = path.join(process.cwd(), '.credentials', 'elena-sa.json');
  if (fs.existsSync(local)) {
    return new google.auth.GoogleAuth({ keyFile: local, scopes: SCOPES });
  }
  throw new Error('No Google service-account credentials found. Set GOOGLE_SERVICE_ACCOUNT_JSON or place .credentials/elena-sa.json.');
}

function getClient() {
  const auth = resolveAuth();
  return google.drive({ version: 'v3', auth });
}

// Returns docs in the Elena folder, newest first. Caller supplies a Set of
// already-processed fileIds so the picker can skip them.
export async function listDocs(folderId, { pageSize = 25 } = {}) {
  const drive = getClient();
  const r = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
    fields: 'files(id,name,createdTime,modifiedTime)',
    orderBy: 'createdTime desc',
    pageSize,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  return r.data.files || [];
}

// Export a Doc as markdown. Google's native markdown export is clean enough
// that we don't need to walk structured content — we just post-process the
// string (see elena-docmd.mjs).
export async function exportDocMarkdown(fileId) {
  const drive = getClient();
  const r = await drive.files.export(
    { fileId, mimeType: 'text/markdown' },
    { responseType: 'text' },
  );
  return typeof r.data === 'string' ? r.data : String(r.data);
}
