import assert from 'node:assert/strict';
import test from 'node:test';

import { parseNotation } from '../src/lib/notation.ts';

test('parseNotation returns an empty array for empty or whitespace-only input', () => {
  assert.deepEqual(parseNotation(''), []);
  assert.deepEqual(parseNotation('   \n\t  '), []);
});

test('parseNotation preserves order and identifies modifiers', () => {
  const parsed = parseNotation("R U' F2");

  assert.deepEqual(
    parsed.map(({ raw, base, modifier, isPrime, isDouble }) => ({
      raw,
      base,
      modifier,
      isPrime,
      isDouble,
    })),
    [
      { raw: 'R', base: 'R', modifier: '', isPrime: false, isDouble: false },
      { raw: "U'", base: 'U', modifier: "'", isPrime: true, isDouble: false },
      { raw: 'F2', base: 'F', modifier: '2', isPrime: false, isDouble: true },
    ]
  );
});

test('parseNotation identifies wide, slice, and rotation moves', () => {
  const [wideExplicit, wideLowercase, slice, rotation] = parseNotation('Rw r M x');

  assert.equal(wideExplicit.isWide, true);
  assert.equal(wideExplicit.isSlice, false);
  assert.equal(wideExplicit.isRotation, false);

  assert.equal(wideLowercase.isWide, true);
  assert.equal(wideLowercase.isInnerSlice, true);
  assert.equal(slice.isSlice, true);
  assert.equal(rotation.isRotation, true);
});

test('parseNotation supports 4x4 wide, inner-slice, and parity sequences', () => {
  const basic = parseNotation("Rw Uw2 r2 x'");
  assert.deepEqual(
    basic.map((move) => move.base),
    ['Rw', 'Uw', 'r', 'x']
  );
  assert.equal(basic[1].isDouble, true);
  assert.equal(basic[2].isInnerSlice, true);

  const ollParity = parseNotation("Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'");
  assert.equal(ollParity.length, 18);
  assert.equal(ollParity.some((move) => move.base === 'Rw'), true);
  assert.equal(ollParity.some((move) => move.base === 'Lw'), true);
  assert.equal(ollParity.some((move) => move.base === 'x'), true);

  const pllParity = parseNotation("r2 U2 r2 Uw2 r2 Uw2");
  assert.equal(pllParity.length, 6);
  assert.equal(pllParity.filter((move) => move.base === 'r').length, 3);
  assert.equal(pllParity.filter((move) => move.base === 'Uw').length, 2);
});
