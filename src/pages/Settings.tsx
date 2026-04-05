import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Volume2, VolumeX, Zap, MonitorPlay, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Settings() {
  const { soundEnabled, reducedMotion, useChunks, arcadeSpeed, toggleSound, toggleReducedMotion, toggleUseChunks, setArcadeSpeed } = useSettingsStore();

  return (
    <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-slate-400">Customize your training experience.</p>
      </header>

      <div className="space-y-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-200">Sound Effects</h3>
                <p className="text-sm text-slate-400">Play sounds during Arcade mode</p>
              </div>
            </div>
            <button 
              onClick={toggleSound}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                soundEnabled ? "bg-indigo-500" : "bg-slate-700"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                soundEnabled ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200">Reduced Motion</h3>
                <p className="text-sm text-slate-400">Minimize animations and transitions</p>
              </div>
            </div>
            <button 
              onClick={toggleReducedMotion}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                reducedMotion ? "bg-emerald-500" : "bg-slate-700"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                reducedMotion ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200">Use chunks</h3>
                <p className="text-sm text-slate-400">Show grouped notation and step chunking in trainers</p>
              </div>
            </div>
            <button 
              onClick={toggleUseChunks}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                useChunks ? "bg-violet-500" : "bg-slate-700"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                useChunks ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-200">Arcade Speed</h3>
              <p className="text-sm text-slate-400">Adjust the speed of the rhythm highway</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">Slow</span>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={arcadeSpeed}
              onChange={(e) => setArcadeSpeed(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-sm font-medium text-slate-400">Fast</span>
          </div>
          <div className="text-center mt-2 text-indigo-400 font-mono font-bold">
            {arcadeSpeed.toFixed(1)}x
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-200">Cube Rotation Speed</h3>
              <p className="text-sm text-slate-400">Adjust how fast the cube animates its moves</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">Slow</span>
            <input 
              type="range" 
              min="0.2" 
              max="2" 
              step="0.1" 
              value={useSettingsStore((s) => s.cubeRotationSpeed)}
              onChange={(e) => useSettingsStore.getState().setCubeRotationSpeed(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-sm font-medium text-slate-400">Fast</span>
          </div>
          <div className="text-center mt-2 text-blue-400 font-mono font-bold">
            {useSettingsStore((s) => s.cubeRotationSpeed).toFixed(1)}x
          </div>
        </div>
      </div>
    </div>
  );
}
