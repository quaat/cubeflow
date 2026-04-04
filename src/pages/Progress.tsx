import React from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import { ALGORITHMS } from '@/config/algorithms';
import { Trophy, Target, Activity, Flame } from 'lucide-react';

export function Progress() {
  const { mastery, history } = useProgressStore();

  const totalCases = ALGORITHMS.length;
  const masteredCases = Object.values(mastery).filter(m => m >= 80).length;
  const overallMastery = Object.values(mastery).reduce((a, b) => a + b, 0) / (totalCases * 100) || 0;

  const recentHistory = history.slice(0, 10);

  return (
    <div className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-slate-400">Track your mastery across all algorithms.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Overall Mastery</p>
            <p className="text-2xl font-bold text-white">{(overallMastery * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Cases Mastered</p>
            <p className="text-2xl font-bold text-white">{masteredCases} <span className="text-sm text-slate-500">/ {totalCases}</span></p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Total Sessions</p>
            <p className="text-2xl font-bold text-white">{history.length}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800 flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Avg Accuracy</p>
            <p className="text-2xl font-bold text-white">
              {history.length > 0 
                ? (history.reduce((acc, curr) => acc + curr.accuracy, 0) / history.length).toFixed(0) 
                : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mastery by Category */}
        <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <h2 className="text-xl font-bold mb-6">Mastery by Case</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {ALGORITHMS.map(algo => {
              const m = mastery[algo.id] || 0;
              return (
                <div key={algo.id} className="flex items-center gap-4">
                  <div className="w-32 truncate text-sm font-medium text-slate-300">{algo.name}</div>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${m}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm text-slate-500">{m}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/50 p-6 rounded-2xl ring-1 ring-slate-800">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          {recentHistory.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent activity. Start drilling!</p>
          ) : (
            <div className="space-y-4">
              {recentHistory.map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-200 capitalize">{entry.mode} Session</p>
                    <p className="text-xs text-slate-500">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">{entry.score} pts</p>
                    <p className="text-xs text-slate-500">{entry.accuracy}% acc</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
