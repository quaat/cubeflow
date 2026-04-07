import assert from 'node:assert/strict';
import test from 'node:test';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CaseThumbnail } from '../src/components/cube/CaseThumbnail.tsx';
import { AlgorithmCase } from '../src/config/algorithms.ts';

function createAlgorithm(overrides: Partial<AlgorithmCase>): AlgorithmCase {
  return {
    id: 'test-case',
    name: 'Test Case',
    category: 'Beginner',
    sequence: "R U R'",
    ...overrides,
  };
}

test('CaseThumbnail renders a 3x3 u-face when size is omitted', () => {
  const algo = createAlgorithm({
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
    },
  });

  const markup = renderToStaticMarkup(<CaseThumbnail algo={algo} />);
  const rectCount = (markup.match(/<rect/g) ?? []).length;
  assert.equal(rectCount, 9);
});

test('CaseThumbnail renders a 4x4 u-face and 4-sticker side ring', () => {
  const algo = createAlgorithm({
    cubeSize: 4,
    category: '4x4',
    thumbnail: {
      size: 4,
      uFace: [
        ['Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['U', 'U', 'U', 'U'],
        right: ['U', 'U', 'U', 'U'],
        back: ['U', 'U', 'U', 'U'],
        left: ['U', 'U', 'U', 'U'],
      },
    },
  });

  const markup = renderToStaticMarkup(<CaseThumbnail algo={algo} />);
  const rectCount = (markup.match(/<rect/g) ?? []).length;
  assert.equal(rectCount, 32);
});

test('CaseThumbnail arrows render on 4x4 thumbnails', () => {
  const algo = createAlgorithm({
    cubeSize: 4,
    category: '4x4',
    thumbnail: {
      size: 4,
      uFace: [
        ['X', 'X', 'X', 'X'],
        ['X', 'Y', 'Y', 'X'],
        ['X', 'Y', 'Y', 'X'],
        ['X', 'X', 'X', 'X'],
      ],
      arrows: [{ start: [1, 1], end: [2, 2], curved: true }],
    },
  });

  const markup = renderToStaticMarkup(<CaseThumbnail algo={algo} />);
  assert.ok(markup.includes('<path'));
  assert.ok(markup.includes('<marker'));
});

test('CaseThumbnail fails safely for malformed thumbnail grid', () => {
  const algo = createAlgorithm({
    thumbnail: {
      // Intentionally malformed: inconsistent row lengths for declared 4x4.
      size: 4,
      uFace: [
        ['X', 'X', 'X', 'X'],
        ['X', 'X', 'X'],
        ['X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X'],
      ],
    },
  });

  const markup = renderToStaticMarkup(<CaseThumbnail algo={algo} />);
  assert.equal(markup.includes('<svg'), false);
});
