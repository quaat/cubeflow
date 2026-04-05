import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';

import { installMockStorage, memoryStorage } from './helpers/mockStorage.ts';

installMockStorage();

const { useProgressStore } = await import('../src/store/useProgressStore.ts');

beforeEach(() => {
  memoryStorage.clear();
  useProgressStore.setState({
    favorites: [],
    mastery: {},
    history: [],
  });
});

test('toggleFavorite adds and removes favorites without duplicates', () => {
  useProgressStore.getState().toggleFavorite('pll-ua');
  useProgressStore.getState().toggleFavorite('pll-ua');

  assert.deepEqual(useProgressStore.getState().favorites, []);

  useProgressStore.getState().toggleFavorite('pll-ua');
  useProgressStore.getState().toggleFavorite('oll-sune');

  assert.deepEqual(useProgressStore.getState().favorites, ['pll-ua', 'oll-sune']);
});

test('updateMastery accumulates values and clamps them between 0 and 100', () => {
  useProgressStore.getState().updateMastery('pll-ua', 35);
  useProgressStore.getState().updateMastery('pll-ua', 80);
  useProgressStore.getState().updateMastery('oll-sune', -10);

  assert.equal(useProgressStore.getState().mastery['pll-ua'], 100);
  assert.equal(useProgressStore.getState().mastery['oll-sune'], 0);
});

test('addHistory prepends entries, timestamps them, and caps the list at 50', () => {
  for (let index = 0; index < 55; index += 1) {
    useProgressStore.getState().addHistory({
      accuracy: 80 + (index % 5),
      mode: `mode-${index}`,
      score: index,
    });
  }

  const { history } = useProgressStore.getState();

  assert.equal(history.length, 50);
  assert.equal(history[0].score, 54);
  assert.equal(history.at(-1)?.score, 5);
  assert.match(history[0].date, /^\d{4}-\d{2}-\d{2}T/);
});

test('progress store writes persisted state to storage', () => {
  useProgressStore.getState().toggleFavorite('pll-ua');

  const persisted = memoryStorage.getItem('cube-progress-storage');
  assert.ok(persisted);
  assert.match(persisted, /pll-ua/);
});
