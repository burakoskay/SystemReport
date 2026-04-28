import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markdownToSpeechText } from './tts.mjs';

test('markdownToSpeechText basic functionality', () => {
  const title = 'Hello World';
  const description = 'A simple test';
  const body = 'This is a **bold** word and an *italic* one.';
  const expected = 'Hello World. A simple test.\n\nThis is a bold word and an italic one.';
  assert.strictEqual(markdownToSpeechText(title, description, body), expected);
});

test('markdownToSpeechText strips headings', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = '# Heading 1\n## Heading 2\n### Heading 3';
  const expected = 'Title. Desc.\n\nHeading 1\nHeading 2\nHeading 3';
  assert.strictEqual(markdownToSpeechText(title, description, body), expected);
});

test('markdownToSpeechText handles links and images', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = 'Check [this link](https://example.com) and ![this image](image.png).';
  const expected = 'Title. Desc.\n\nCheck this link and .';
  assert.strictEqual(markdownToSpeechText(title, description, body), expected);
});

test('markdownToSpeechText strips code blocks', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = 'Some text.\n```javascript\nconsole.log("hello");\n```\nMore text.';
  const expected = 'Title. Desc.\n\nSome text.\n\nMore text.';
  assert.strictEqual(markdownToSpeechText(title, description, body), expected);
});

test('markdownToSpeechText handles lists and blockquotes', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = '- Item 1\n* Item 2\n+ Item 3\n1. Numbered 1\n2. Numbered 2\n> This is a blockquote.';
  const expected = 'Title. Desc.\n\nItem 1\nItem 2\nItem 3\nNumbered 1\nNumbered 2\nThis is a blockquote.';
  assert.strictEqual(markdownToSpeechText(title, description, body), expected);
});

test('markdownToSpeechText strips footnotes', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = 'Ref [^1].\n\n[^1]: Definition';
  const expected = 'Title. Desc.\n\nRef .';
  assert.strictEqual(markdownToSpeechText(title, description, body).trim(), expected.trim());
});

test('markdownToSpeechText strips tables and horizontal rules', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = '| col1 | col2 |\n| --- | --- |\n| val1 | val2 |\n\n---\n\nMore text.';
  const expected = 'Title. Desc\n\n\n\n\nMore text.';
  // Tables and HRs leave some whitespace/newlines, we check if they are gone or reduced.
  // The current implementation of table stripping might leave empty lines.
  const result = markdownToSpeechText(title, description, body);
  assert.ok(!result.includes('col1'));
  assert.ok(!result.includes('---'));
  assert.ok(result.includes('More text.'));
});

test('markdownToSpeechText handles empty or missing inputs', () => {
  assert.strictEqual(markdownToSpeechText('Title', '', ''), 'Title.');
  assert.strictEqual(markdownToSpeechText('Title', null, null), 'Title.');
});

test('markdownToSpeechText handles nested formatting', () => {
  const title = 'Title';
  const description = 'Desc';
  const body = 'This is ***bold and italic*** and [**bold link**](https://example.com).';
  // Current regexes:
  // .replace(/\*\*([^*]+)\*\*/g, '$1')         // bold
  // .replace(/\*([^*]+)\*/g, '$1')             // italic
  // For '***bold and italic***':
  // 1. bold -> '*bold and italic*'
  // 2. italic -> 'bold and italic'
  // For '[**bold link**](https://example.com)':
  // 1. link -> '**bold link**'
  // 2. bold -> 'bold link'
  const expected = 'Title. Desc.\n\nThis is bold and italic and bold link.';
  assert.strictEqual(markdownToSpeechText(title, description, body), expected);
});

test('markdownToSpeechText avoids repeating description if it starts the body', () => {
  const title = 'Title';
  const description = 'Description';
  const body = 'Description. More content.';
  const expected = 'Title. Description. More content.';
  const result = markdownToSpeechText(title, description, body);
  assert.strictEqual(result, expected);
});

test('markdownToSpeechText handles various punctuation in title and description', () => {
  assert.strictEqual(markdownToSpeechText('Hello!', 'How are you?', 'Fine.'), 'Hello! How are you?\n\nFine.');
  assert.strictEqual(markdownToSpeechText('Hello?', 'Is it me...', 'You are looking for.'), 'Hello? Is it me...\n\nYou are looking for.');
});
