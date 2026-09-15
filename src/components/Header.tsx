import React, { useState } from 'react';
import { ViewMode } from '../types';
import { RAW_MARKDOWN_PROPOSAL } from '../data/proposalData';
import { FileText, Presentation, Wrench, Printer, Copy, Check, Download, Cpu, Sparkles, Activity } from 'lucide-react';

interface HeaderProps {
  activeMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  isHardwareHealthOpen: boolean;
  onToggleHardwareHealth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeMode, 
  onModeChange, 
  isHardwareHealthOpen, 
  onToggleHardwareHealth 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(RAW_MARKDOWN_PROPOSAL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([RAW_MARKDOWN_PROPOSAL], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Edge_AI_Simulation_Project_Proposal.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: App Title & Hardware Tag */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base font-bold text-zinc-100 tracking-tight">
                The Edge AI &amp; Simulation Project
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                NVIDIA Jetson Nano
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Real-time Generative AI inference + OpenUSD scene simulation
            </p>
          </div>
        </div>

        {/* Center: Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium">
          <button
            id="mode-tab-document"
            onClick={() => onModeChange('document')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'document'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Proposal Document</span>
          </button>

          <button
            id="mode-tab-presentation"
            onClick={() => onModeChange('presentation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'presentation'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Slide Deck</span>
          </button>

          <button
            id="mode-tab-guide"
            onClick={() => onModeChange('working-guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'working-guide'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Working Lab Guide</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            id="header-hardware-health-btn"
            onClick={onToggleHardwareHealth}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              isHardwareHealthOpen
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md'
                : 'border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-emerald-400'
            }`}
            title="Toggle Jetson Nano Hardware Health Monitor"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Hardware Health</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            id="copy-markdown-btn"
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-zinc-100 text-xs font-mono transition-colors"
            title="Copy proposal in raw Markdown"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy MD</span>
              </>
            )}
          </button>

          <button
            id="download-markdown-btn"
            onClick={handleDownloadMarkdown}
            className="p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Download .md file"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            id="print-proposal-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold transition-colors"
            title="Print or export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
