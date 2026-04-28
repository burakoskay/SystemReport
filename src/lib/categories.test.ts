import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getArticleCategory } from './categories.ts';

describe('getArticleCategory', () => {
  it('returns "tech" for empty or undefined tags', () => {
    assert.equal(getArticleCategory([]), 'tech');
    // @ts-ignore: Intentionally testing invalid runtime input
    assert.equal(getArticleCategory(undefined), 'tech');
    // @ts-ignore: Intentionally testing invalid runtime input
    assert.equal(getArticleCategory(null), 'tech');
  });

  it('returns "tech" when no tags match any keywords', () => {
    assert.equal(getArticleCategory(['random', 'unknown', 'words']), 'tech');
    assert.equal(getArticleCategory(['cooking', 'recipes']), 'tech');
  });

  it('correctly maps exactly matching tags to their categories', () => {
    assert.equal(getArticleCategory(['ai']), 'ai');
    assert.equal(getArticleCategory(['playstation']), 'gaming');
    assert.equal(getArticleCategory(['gpu']), 'hardware');
    assert.equal(getArticleCategory(['ios']), 'software');
  });

  it('matches tags case-insensitively', () => {
    assert.equal(getArticleCategory(['aRtIfIcIaL iNtElLiGeNcE']), 'ai');
    assert.equal(getArticleCategory(['XBOX']), 'gaming');
    assert.equal(getArticleCategory(['SmartPhone']), 'hardware');
    assert.equal(getArticleCategory(['mAcOs']), 'software');
  });

  it('matches when a tag contains a keyword (t.includes(kw))', () => {
    assert.equal(getArticleCategory(['the new chatgpt version']), 'ai');
    assert.equal(getArticleCategory(['best pc gaming setup']), 'gaming');
    assert.equal(getArticleCategory(['my smartwatch review']), 'hardware');
    assert.equal(getArticleCategory(['open source software project']), 'software');
  });

  it('matches when a keyword contains a tag (kw.includes(t))', () => {
    // 'artificial intelligence' is a keyword, so 'artificial' is contained in it
    // Wait, the logic is kw.includes(t) so if tag is 'artificial', it matches 'artificial intelligence'
    assert.equal(getArticleCategory(['artificial']), 'ai');
    assert.equal(getArticleCategory(['nintend']), 'gaming');
    assert.equal(getArticleCategory(['semiconduct']), 'hardware');
    assert.equal(getArticleCategory(['firmwar']), 'software');
  });

  it('respects priority order (ai > gaming > hardware > software > tech)', () => {
    // ai > gaming
    assert.equal(getArticleCategory(['game', 'ai']), 'ai');
    // gaming > hardware
    assert.equal(getArticleCategory(['gpu', 'xbox']), 'gaming');
    // hardware > software
    assert.equal(getArticleCategory(['ios', 'cpu']), 'hardware');
    // ai > software
    assert.equal(getArticleCategory(['linux', 'machine learning']), 'ai');
  });
});
