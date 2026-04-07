import assert from 'node:assert/strict';
import test from 'node:test';

import { ALGORITHMS, CATEGORIES } from '../src/config/algorithms.ts';
import { parseNotation } from '../src/lib/notation.ts';

const validBases = new Set([
  'R', 'L', 'U', 'D', 'F', 'B',
  'M', 'E', 'S',
  'Rw', 'Lw', 'Uw', 'Dw', 'Fw', 'Bw',
  'r', 'l', 'u', 'd', 'f', 'b',
  'x', 'y', 'z',
]);

test('algorithm ids are unique and every category is represented', () => {
  const ids = ALGORITHMS.map((algorithm) => algorithm.id);
  const uniqueIds = new Set(ids);
  const representedCategories = new Set(ALGORITHMS.map((algorithm) => algorithm.category));

  assert.equal(uniqueIds.size, ids.length);
  assert.deepEqual([...representedCategories].sort(), [...CATEGORIES].sort());
});

test('4x4 entries are present with valid cube size metadata', () => {
  const fourByFourIds = [
    '4x4-last-two-edges',
    '4x4-oll-parity',
    '4x4-pll-parity',
  ];

  const fourByFourCases = ALGORITHMS.filter((algorithm) => algorithm.category === '4x4');
  assert.equal(fourByFourCases.length, 3, 'There should be exactly 3 cases in the 4x4 category');
  assert.deepEqual(fourByFourCases.map((algorithm) => algorithm.id).sort(), [...fourByFourIds].sort());

  for (const algorithm of ALGORITHMS) {
    if (algorithm.cubeSize !== undefined) {
      assert.ok(algorithm.cubeSize === 3 || algorithm.cubeSize === 4, `${algorithm.id} has invalid cube size`);
    }
  }

  for (const algorithm of fourByFourCases) {
    assert.equal(algorithm.cubeSize, 4, `${algorithm.id} should be marked as 4x4`);
  }
});

test('every algorithm sequence is non-empty and uses supported notation tokens', () => {
  for (const algorithm of ALGORITHMS) {
    assert.notEqual(algorithm.sequence.trim(), '', `${algorithm.id} has an empty sequence`);

    const parsedMoves = parseNotation(algorithm.sequence);
    assert.ok(parsedMoves.length > 0, `${algorithm.id} did not parse into any moves`);

    for (const move of parsedMoves) {
      assert.ok(validBases.has(move.base), `${algorithm.id} uses unsupported move ${move.raw}`);
    }
  }
});

test('algorithm thumbnails stay within their configured cube face bounds', () => {
  for (const algorithm of ALGORITHMS) {
    const { thumbnail } = algorithm;
    if (!thumbnail) continue;

    const dimension = thumbnail.size ?? thumbnail.uFace.length;
    assert.ok(dimension === 3 || dimension === 4, `${algorithm.id} should define a 3x3 or 4x4 thumbnail`);
    assert.equal(thumbnail.uFace.length, dimension, `${algorithm.id} should define ${dimension} thumbnail rows`);

    for (const row of thumbnail.uFace) {
      assert.equal(row.length, dimension, `${algorithm.id} should define ${dimension} thumbnail columns`);
    }

    if (thumbnail.sideRing) {
      assert.equal(thumbnail.sideRing.front.length, dimension, `${algorithm.id} front ring should have ${dimension} stickers`);
      assert.equal(thumbnail.sideRing.right.length, dimension, `${algorithm.id} right ring should have ${dimension} stickers`);
      assert.equal(thumbnail.sideRing.back.length, dimension, `${algorithm.id} back ring should have ${dimension} stickers`);
      assert.equal(thumbnail.sideRing.left.length, dimension, `${algorithm.id} left ring should have ${dimension} stickers`);
    }

    for (const arrow of thumbnail.arrows ?? []) {
      for (const [row, col] of [arrow.start, arrow.end]) {
        assert.ok(row >= 0 && row < dimension, `${algorithm.id} arrow row ${row} is out of bounds`);
        assert.ok(col >= 0 && col < dimension, `${algorithm.id} arrow col ${col} is out of bounds`);
      }
    }
  }
});

test('3x3 thumbnails default to size 3 when size is omitted', () => {
  const threeByThreeCase = ALGORITHMS.find((algorithm) => algorithm.thumbnail && !algorithm.thumbnail.size);
  assert.ok(threeByThreeCase);
  assert.equal(threeByThreeCase.thumbnail?.uFace.length, 3);
});
