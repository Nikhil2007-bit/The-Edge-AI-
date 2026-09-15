/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Header } from './components/Header';
import { ProposalDocumentView } from './components/ProposalDocumentView';
import { PresentationMode } from './components/PresentationMode';
import { WorkingGuideView } from './components/WorkingGuideView';
import { HardwareHealthWidget } from './components/HardwareHealthWidget';
import { Cpu, Layers, ExternalLink, ShieldCheck, Github, Printer } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<ViewMode>('document');
  const [isHardwareHealthOpen, setIsHardwareHealthOpen] = useState<boolean>(false);

  // Handle URL hash or keyboard shortcut if any
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        // let standard print handler operate
      } else if (e.key === 'h' && (e.metaKey || e.altKey)) {
        setIsHardwareHealthOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Header with Navigation and Quick Actions */}
      <Header
        activeMode={activeMode}
        onModeChange={(mode) => setActiveMode(mode)}
        isHardwareHealthOpen={isHardwareHealthOpen}
        onToggleHardwareHealth={() => setIsHardwareHealthOpen(!isHardwareHealthOpen)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {activeMode === 'presentation' ? (
          <PresentationMode onExit={() => setActiveMode('document')} />
        ) : activeMode === 'working-guide' ? (
          <WorkingGuideView />
        ) : (
          <ProposalDocumentView />
        )}
      </main>

      {/* Mock Hardware Health Sidebar Widget */}
      <HardwareHealthWidget
        isOpen={isHardwareHealthOpen}
        onClose={() => setIsHardwareHealthOpen(false)}
        onToggle={() => setIsHardwareHealthOpen(!isHardwareHealthOpen)}
      />

      {/* Formal Document Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 mt-16 no-print text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="font-semibold text-zinc-200">
              The Edge AI &amp; Simulation Project
            </span>
            <span className="text-zinc-600">•</span>
            <span>NVIDIA Jetson Nano + OpenUSD</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 font-mono">
            <span>Tegra Maxwell GPU (4GB LPDDR4)</span>
            <span>•</span>
            <button
              onClick={() => window.print()}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
