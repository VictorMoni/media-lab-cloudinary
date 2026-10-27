import test from 'node:test';
import assert from 'node:assert/strict';
import { imageUrl, imageSrcSet } from '../lib/cloudinary.mjs';

test('original does not include transformations', () => {
  assert.equal(imageUrl({ optimized: false }), 'https://res.cloudinary.com/demo/image/upload/sample');
});
test('portrait output uses selected width, automatic crop, quality and format', () => {
  assert.equal(imageUrl({ width: 320, shape: 'portrait' }), 'https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,w_320,h_400/q_auto/f_auto/sample');
});
test('folder names and unicode are encoded without losing folder separators', () => {
  assert.ok(imageUrl({ publicId: 'fotos/café' }).endsWith('/fotos/caf%C3%A9'));
});
test('rejects URLs and invalid clouds instead of changing the URL structure', () => {
  assert.throws(() => imageUrl({ cloud: 'evil.com/path' }));
  assert.throws(() => imageUrl({ publicId: 'sample?x=y' }));
});
test('responsive candidates include every supported width', () => {
  const candidates = imageSrcSet({}).split(', ');
  assert.equal(candidates.length, 5);
  assert.ok(candidates[0].endsWith(' 320w'));
  assert.ok(candidates.at(-1).endsWith(' 1280w'));
});
