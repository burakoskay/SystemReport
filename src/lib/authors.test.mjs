import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assignAuthor, AUTHORS, AUTHOR_LIST } from './authors.mjs';

test('assignAuthor exact tag match', () => {
  // maya-chen has 'openai' in tagHints
  const author = assignAuthor(['openai'], 'unrelated');
  assert.strictEqual(author.slug, 'maya-chen');
});

test('assignAuthor substring match (>= 4 chars)', () => {
  // david-okafor has 'smartphone'
  // Let's pass a tag that contains 'smartphone'
  const author = assignAuthor(['new smartphones'], 'unrelated');
  assert.strictEqual(author.slug, 'david-okafor');

  // maya-chen has 'machine learning'
  const author2 = assignAuthor(['machine learning models'], 'unrelated');
  assert.strictEqual(author2.slug, 'maya-chen');
});

test('assignAuthor guards against short substring matches', () => {
  // elena-marchetti has 'eu' and 'un' in tagHints.
  // 'reunion' contains both 'eu' and 'un', but they are short hints (< 4 chars).
  // The substring matching guard should prevent them from matching.
  // We use category 'gaming' which belongs to 'sam-whitfield' to verify it falls back to pure category match.
  const author = assignAuthor(['reunion'], 'gaming');
  assert.strictEqual(author.slug, 'sam-whitfield');
});

test('assignAuthor scoring with category match', () => {
  // Maya has tag 'ai', category 'ai'
  // If we give tag 'ai' (+2) and category 'ai' (+1), score is 3.
  const author = assignAuthor(['ai'], 'ai');
  assert.strictEqual(author.slug, 'maya-chen');
});

test('assignAuthor pure category match fallback', () => {
  // No tags given, but category is 'software'. Priya Raman has category 'software'.
  const author = assignAuthor([], 'software');
  assert.strictEqual(author.slug, 'priya-raman');
});

test('assignAuthor deterministic hash fallback', () => {
  // Empty tags, unknown category.
  // Hash fallback depends on categorySlug or seed.
  const author1 = assignAuthor([], 'unknown-category', 'seed1');
  const author2 = assignAuthor([], 'unknown-category', 'seed1');
  assert.strictEqual(author1.slug, author2.slug);

  // Different seed might give different author (or same, but predictably)
  const author3 = assignAuthor([], 'unknown-category', 'seed2');
  assert.ok(author1.slug !== undefined);
  assert.ok(author3.slug !== undefined);
});

test('assignAuthor handles empty and undefined inputs', () => {
  const author = assignAuthor(undefined, undefined, undefined);
  // It shouldn't crash.
  assert.ok(author && author.slug);

  const author2 = assignAuthor([], '', '');
  assert.ok(author2 && author2.slug);
});
