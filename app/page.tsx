'use client';

import { useState } from 'react';
import { mockSignalData } from '../data/mockData';
import { Sparkles, Clock, Check, Send, ShieldAlert, ArrowLeftRight, FileText } from 'lucide-react';

export default function SmartDraftDashboard() {
  const [currentVersion, setCurrentVersion] = useState<string>('default');
  const [emailText, setEmailText] = useState<string>(mockSignalData.emailVariations.default);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleVersionChange = (versionKey: string) => {
    setCurrentVersion(versionKey);
    setEmailText(mockSignalData.emailVariations[versionKey as keyof typeof mockSignalData.emailVariations]);
  };

  const handleApproveAndSend = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative antialiased">
      {showNotification && (
        <div className="absolute top-6 right-6 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-bounce z-50">
          <Check className="w-5 h-5 bg-white text-emerald-500 rounded-full p-0.5" />
          <span className="font-medium">Pipeline Verified: Draft Successfully Synced to CRM!</span>
        </div>
      )}

      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold text-lg shadow-lg shadow-indigo-600/20">P</div>
          <span className="font-bold text-xl tracking-tight">Pipeline <span className="text-indigo-400 font-medium">AI</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5 text-xs text-slate-300">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Workspace Active
          </span>
          <span>PM Intern Demo</span>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl w-full mx-auto p-8 flex flex-col gap-6">
        <header className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 border border-indigo-500/20 mt-1">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-white">{mockSignalData.company}</h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  High Buying Intent
                </span>
              </div>
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200 font-medium">Trigger Signal:</span> {mockSignalData.trigger}
              </p>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-5 py-3 md:text-right min-w-[240px]">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-0.5">Target Decision Maker</span>
            <span className="text-slate-200 font-medium block">{mockSignalData.targetContact}</span>
          </div>
        </header>

        <section className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch min-h-[500px]">
          <div className="lg:col-span-2 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-sm text-slate-200">AI Contextual Draft Output</span>
              </div>
              <span className="text-xs text-slate-500 italic">Fully editable workspace</span>
            </div>
            <textarea
              className="flex-1 w-full bg-slate-950 p-6 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none font-mono text-sm leading-relaxed border-b border-slate-800"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            />
            <div className="px-6 py-4 bg-slate-900/50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex gap-4">
                <span>Words: {emailText.split(/\s+/).filter(Boolean).length}</span>
                <span>Characters: {emailText.length}</span>
              </div>
              <span className="text-indigo-400/80 font-medium capitalize">Active Version: {currentVersion}</span>
            </div>
          </div>

          <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2 mb-1">
                  <ArrowLeftRight className="w-4 h-4 text-indigo-400" />
                  Smart Draft Adjusters
                </h2>
                <p className="text-xs text-slate-400">One-click modifiers to dynamically retarget parameters.</p>
              </div>

              <div className="flex flex-col gap-3">
                {['default', 'shorter', 'casual', 'metrics'].map((version) => (
                  <button
                    key={version}
                    onClick={() => handleVersionChange(version)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${
                      currentVersion === version
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-medium capitalize">{version === 'default' ? 'Original Blueprint' : version}</span>
                    {version === 'shorter' && <Clock className="w-4 h-4" />}
                    {version === 'metrics' && <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-bold">90%</span>}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleApproveAndSend}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 text-sm border border-indigo-500/30"
            >
              <Send className="w-4 h-4" />
              Approve & Sync to CRM
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}