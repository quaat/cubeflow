import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';

import { installMockStorage, memoryStorage } from './helpers/mockStorage.ts';

installMockStorage();

const { useSettingsStore } = await import('../src/store/useSettingsStore.ts');

beforeEach(() => {
  memoryStorage.clear();
  useSettingsStore.setState({
    arcadeSpeed: 1,
    cubeRotationSpeed: 1,
    reducedMotion: false,
    soundEnabled: true,
    useChunks: false,
  });
});

test('settings toggles flip their boolean state', () => {
  useSettingsStore.getState().toggleSound();
  useSettingsStore.getState().toggleReducedMotion();
  useSettingsStore.getState().toggleUseChunks();

  const state = useSettingsStore.getState();
  assert.equal(state.soundEnabled, false);
  assert.equal(state.reducedMotion, true);
  assert.equal(state.useChunks, true);
});

test('settings setters update numeric preferences directly', () => {
  useSettingsStore.getState().setArcadeSpeed(1.5);
  useSettingsStore.getState().setCubeRotationSpeed(0.75);

  const state = useSettingsStore.getState();
  assert.equal(state.arcadeSpeed, 1.5);
  assert.equal(state.cubeRotationSpeed, 0.75);
});

test('settings store writes persisted state to storage', () => {
  useSettingsStore.getState().toggleSound();
  useSettingsStore.getState().toggleUseChunks();

  const persisted = memoryStorage.getItem('cube-settings-storage');
  assert.ok(persisted);
  assert.match(persisted, /false/);
  assert.match(persisted, /useChunks/);
});

test('useChunks defaults to false', () => {
  assert.equal(useSettingsStore.getState().useChunks, false);
});
