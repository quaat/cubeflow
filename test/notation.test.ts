import assert from 'node:assert/strict';
import test from 'node:test';

import { expandChunkRegistry, getDisplayNotation, getNotationSteps, parseNotation } from '../src/lib/notation.ts';

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

test('chunk registry expansion resolves nested references', () => {
  const expanded = expandChunkRegistry();

  assert.deepEqual(expanded.TRIG_R, ['R', 'U', "R'"]);
  assert.deepEqual(expanded.SEXY, ['R', 'U', "R'", "U'"]);
  assert.deepEqual(expanded.OLL_LINE, ['F', 'R', 'U', "R'", "U'", "F'"]);
  assert.deepEqual(expanded.OLL_L, ['f', 'R', 'U', "R'", "U'", "f'"]);
  assert.deepEqual(expanded.INSERT, ['U', 'R', "U'", "R'"]);
});

test('chunk matching prefers longest expansions and avoids overlap', () => {
  const ollLine = getNotationSteps("F R U R' U' F'", true).map((step) => step.label);
  assert.deepEqual(ollLine, ['OLL_LINE']);

  const ollL = getNotationSteps("f R U R' U' f'", true).map((step) => step.label);
  assert.deepEqual(ollL, ['OLL_L']);

  const twistTwice = getNotationSteps("R' D' R D R' D' R D", true).map((step) => step.label);
  assert.deepEqual(twistTwice, ['TWIST', 'TWIST']);
});

test('chunked notation falls back to raw moves where no chunk matches', () => {
  const labels = getNotationSteps("M2 U M2", true).map((step) => step.label);
  assert.deepEqual(labels, ['M2', 'U', 'M2']);
});

test('chunk toggle preserves raw behavior when disabled', () => {
  const labels = getNotationSteps("F R U R' U' F'", false).map((step) => step.label);
  assert.deepEqual(labels, ['F', 'R', 'U', "R'", "U'", "F'"]);
});

test('repo sequence compresses to INSERT plus remaining raw moves', () => {
  const display = getDisplayNotation("U R U' R' U' F' U F", true);
  assert.equal(display, "INSERT U' F' U F");
});

test('illustrative sequence compresses to SEXY in the middle', () => {
  const display = getDisplayNotation("U R U R' U' F' U F", true);
  assert.equal(display, "U SEXY F' U F");
});
