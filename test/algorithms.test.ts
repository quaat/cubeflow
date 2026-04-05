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

test('category ordering and distribution match the 2-look/full OLL+PLL split', () => {
  assert.deepEqual(CATEGORIES, ["Beginner", "2-Look OLL", "Advanced OLL", "2-Look PLL", "Advanced PLL"]);

  const byCategory = ALGORITHMS.reduce<Record<string, number>>((acc, algorithm) => {
    acc[algorithm.category] = (acc[algorithm.category] ?? 0) + 1;
    return acc;
  }, {});

  assert.equal(byCategory["2-Look OLL"], 10, '2-Look OLL should contain exactly 10 cases');
  assert.equal(byCategory["Advanced OLL"], 50, 'Advanced OLL should contain exactly 50 cases');
  assert.equal(byCategory["2-Look PLL"], 6, '2-Look PLL should contain exactly 6 cases');
  assert.equal(byCategory["Advanced PLL"], 15, 'Advanced PLL should contain exactly 15 cases');
  assert.equal((byCategory["2-Look PLL"] ?? 0) + (byCategory["Advanced PLL"] ?? 0), 21, 'Combined PLL total should remain 21');
  assert.equal(byCategory["Beginner"], 19, 'Beginner case count should remain unchanged');
});

test('legacy OLL category value is no longer used', () => {
  assert.equal(ALGORITHMS.some((algorithm) => String(algorithm.category) === "OLL"), false);
});

test('legacy PLL category value is no longer used', () => {
  assert.equal(ALGORITHMS.some((algorithm) => String(algorithm.category) === "PLL"), false);
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

test('algorithm thumbnails stay within the expected 3x3 cube face bounds', () => {
  for (const algorithm of ALGORITHMS) {
    const { thumbnail } = algorithm;
    if (!thumbnail) continue;

    assert.equal(thumbnail.uFace.length, 3, `${algorithm.id} should define 3 thumbnail rows`);
    for (const row of thumbnail.uFace) {
      assert.equal(row.length, 3, `${algorithm.id} should define 3 thumbnail columns`);
    }

    if (thumbnail.sideRing) {
      assert.equal(thumbnail.sideRing.front.length, 3, `${algorithm.id} front ring should have 3 stickers`);
      assert.equal(thumbnail.sideRing.right.length, 3, `${algorithm.id} right ring should have 3 stickers`);
      assert.equal(thumbnail.sideRing.back.length, 3, `${algorithm.id} back ring should have 3 stickers`);
      assert.equal(thumbnail.sideRing.left.length, 3, `${algorithm.id} left ring should have 3 stickers`);
    }

    for (const arrow of thumbnail.arrows ?? []) {
      for (const [row, col] of [arrow.start, arrow.end]) {
        assert.ok(row >= 0 && row <= 2, `${algorithm.id} arrow row ${row} is out of bounds`);
        assert.ok(col >= 0 && col <= 2, `${algorithm.id} arrow col ${col} is out of bounds`);
      }
    }
  }
});
