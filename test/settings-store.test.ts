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
  });
});

test('settings toggles flip their boolean state', () => {
  useSettingsStore.getState().toggleSound();
  useSettingsStore.getState().toggleReducedMotion();

  const state = useSettingsStore.getState();
  assert.equal(state.soundEnabled, false);
  assert.equal(state.reducedMotion, true);
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

  const persisted = memoryStorage.getItem('cube-settings-storage');
  assert.ok(persisted);
  assert.match(persisted, /false/);
});
