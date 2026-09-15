import React, { useState, useEffect } from 'react';
import { HardwareChecklist } from './HardwareChecklist';
import { SoftwareEnvironmentGuide } from './SoftwareEnvironmentGuide';
import { InteractiveDemoSimulator } from './InteractiveDemoSimulator';
import { EdgeBenchmarkCalculator } from './EdgeBenchmarkCalculator';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Wrench, Terminal, Cpu, HardDrive, FileText, CheckCircle2, Bookmark, Save } from 'lucide-react';

export const WorkingGuideView: React.FC = () => {
  const [labNotes, setLabNotes] = useState<string>(() => {
    try {
      return localStorage.getItem('jetson_proposal_lab_notes') || 
`# Jetson Nano Lab Notes
- Carrier Board: B01 dual CSI revision
- Power: 5V/4A Barrel jack confirmed. J48 jumper installed for MAXN mode.
- Thermal: Active 4-pin PWM fan attached to heatsink.
- Target Model: TinyLlama 1.1B quantized to INT8 with TensorRT 8.2.
- OpenUSD Scene: /opt/nvidia/usd/workcell.usda validated with pxr python 3.8.`;
    } catch {
      return '';
    }
  });
  const [savedNoteStatus, setSavedNoteStatus] = useState(false);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem('jetson_proposal_lab_notes', labNotes);
      setSavedNoteStatus(true);
      setTimeout(() => setSavedNoteStatus(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Guide Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <Wrench className="w-4 h-4" />
              Interactive Lab &amp; Execution Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight mt-1">
              The Edge AI &amp; Simulation Project: Engineering Workbench
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Use this interactive guide to verify hardware procurement, execute environment commands, simulate OpenUSD stage updates, and test memory allocations for the NVIDIA Jetson Nano.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              Board Rev: <strong>Jetson Nano B01</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              Target Mode: <strong>10W MAXN</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 1. Architecture Flow */}
      <div>
        <ArchitectureDiagram />
      </div>

      {/* 2. Interactive AI & OpenUSD Simulator */}
      <div>
        <InteractiveDemoSimulator />
      </div>

      {/* 3. 4GB Memory Budget & Latency Estimator */}
      <div>
        <EdgeBenchmarkCalculator />
      </div>

      {/* 4. Hardware Checklist */}
      <div>
        <HardwareChecklist />
      </div>

      {/* 5. Software Stack Verification */}
      <div>
        <SoftwareEnvironmentGuide />
      </div>

      {/* 6. Engineer Lab Notes Scratchpad */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-zinc-100">
              Lab Execution Log &amp; Hardware Notes
            </h3>
          </div>
          <button
            onClick={handleSaveNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedNoteStatus ? 'Saved!' : 'Save Notes'}</span>
          </button>
        </div>

        <div className="mt-4">
          <textarea
            value={labNotes}
            onChange={(e) => setLabNotes(e.target.value)}
            rows={7}
            placeholder="Record hardware serial numbers, TensorRT quantization flags, and benchmark results..."
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
          />
          <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono mt-2">
            <span>Notes persist automatically in browser local storage.</span>
            <span>Markdown supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};
