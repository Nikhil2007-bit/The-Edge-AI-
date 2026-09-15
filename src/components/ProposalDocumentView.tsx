import React, { useState } from 'react';
import { PROPOSAL_SECTIONS, PERFORMANCE_METRICS_LIST } from '../data/proposalData';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Target, Cpu, Layers, Workflow, Gauge, Sparkles, CheckCircle, ChevronDown, Check, Bookmark, ExternalLink } from 'lucide-react';

export const ProposalDocumentView: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('objectives');
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});

  const toggleSectionApproval = (id: string) => {
    setCompletedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Workflow': return <Workflow className="w-5 h-5" />;
      case 'Gauge': return <Gauge className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'CheckCircle': return <CheckCircle className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(`proposal-sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 proposal-document">
      {/* Executive Proposal Cover Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Formal Project Proposal
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
            Document Version: 1.0
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
            Review Status: Open for Review
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight leading-tight max-w-4xl">
          The Edge AI &amp; Simulation Project
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-zinc-500">Platform</div>
              <div className="text-sm font-semibold text-zinc-200">
                NVIDIA Jetson Nano Developer Kit (4GB LPDDR4, 128-core Maxwell GPU)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-zinc-500">Core Focus</div>
              <div className="text-sm font-semibold text-zinc-200">
                Real-time Generative AI inference + OpenUSD scene simulation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Quick Navigation Sticky Bar */}
      <div className="sticky top-16 z-30 bg-zinc-950/90 backdrop-blur-md py-3 mb-8 border-y border-zinc-800/70 no-print flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider pl-1 shrink-0">
          Sections:
        </span>
        {PROPOSAL_SECTIONS.map((sec) => {
          const isDone = completedSections[sec.id];
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                activeSectionId === sec.id
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {isDone && <Check className="w-3 h-3 text-emerald-950 stroke-[3]" />}
              <span>{sec.number}. {sec.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Proposal Body with Architecture Diagram */}
      <div className="space-y-12">
        {/* Section 1: Objectives */}
        <section id="proposal-sec-objectives" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 1</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Objectives
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('objectives')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['objectives']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['objectives'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <p className="text-sm text-zinc-300 mt-4 leading-relaxed font-medium">
            {PROPOSAL_SECTIONS[0].summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {PROPOSAL_SECTIONS[0].content.map((obj, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-zinc-200 leading-relaxed font-sans">{obj}</p>
              </div>
            ))}
          </div>

          {/* Subsections: Edge Advantages */}
          <div className="mt-6 p-5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
              Key Edge Advantages vs. Cloud Offload
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
              {PROPOSAL_SECTIONS[0].subsections?.[0].items.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Hardware Setup */}
        <section id="proposal-sec-hardware" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 2</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Hardware Setup
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('hardware')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['hardware']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['hardware'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2">
                Core Compute Platform
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed">
                <strong>Jetson Nano Developer Kit:</strong> Quad-core ARM Cortex-A57 CPU, 128-core Maxwell GPU, 4GB 64-bit LPDDR4 memory with unified memory address space.
              </p>
              <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
                <div>• Architecture: Maxwell @ 921 MHz (472 GFLOPs FP16)</div>
                <div>• CPU: 4x ARM Cortex-A57 @ 1.43 GHz</div>
                <div>• Memory Bandwidth: 25.6 GB/s Unified</div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2">
                Peripherals &amp; Sensor Array
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▶</span>
                  <span><strong>Camera:</strong> Sony IMX219 8MP CSI-2 camera module (low CPU load via hardware ISP).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▶</span>
                  <span><strong>Robotics Sensors:</strong> 6-DOF IMU (MPU6050), Ultrasonic HC-SR04, and active IR proximity arrays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▶</span>
                  <span><strong>Visualization:</strong> HDMI 2.0 display output for real-time USDView 3D viewport.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">▶</span>
                  <span><strong>Power &amp; Storage:</strong> 5V/4A DC Barrel Jack (10W mode), 128GB UHS-I MicroSD / USB 3.0 SSD.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Software Stack */}
        <section id="proposal-sec-software" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 3</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Software Stack
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('software')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['software']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['software'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-2">
                1. AI Inference
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                <li>• PyTorch + NVIDIA TensorRT</li>
                <li>• Stable Diffusion Lite (LCM-LoRA)</li>
                <li>• Whisper small / faster-whisper</li>
                <li>• GPT2-mini / TinyLlama 1.1B</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-teal-400 font-bold uppercase mb-2">
                2. Simulation Engine
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                <li>• Pixar OpenUSD (pxr library)</li>
                <li>• USDView OpenGL visualizer</li>
                <li>• Hydra Storm render delegate</li>
                <li>• Parametric .usda / .usdc stages</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2">
                3. System Tools
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                <li>• NVIDIA JetPack SDK (L4T)</li>
                <li>• CUDA 10.2 &amp; cuDNN 8.2</li>
                <li>• Docker w/ NVIDIA Container Runtime</li>
                <li>• Ubuntu Linux 18.04 / 20.04</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Embedded Interactive Architecture Pipeline */}
        <div className="my-8">
          <ArchitectureDiagram />
        </div>

        {/* Section 4: Methodology */}
        <section id="proposal-sec-methodology" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Methodology &amp; Implementation Plan
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('methodology')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['methodology']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['methodology'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold mb-2">
                  <span>PHASE 1</span>
                  <span>OPTIMIZATION</span>
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  Model Optimization
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Quantize (FP16/INT8) and prune generative models for Nano's 128-core Maxwell GPU. Benchmark latency, frame rate, and energy consumption.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                Target: &lt; 2.2GB GPU memory footprint
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-teal-400 font-bold mb-2">
                  <span>PHASE 2</span>
                  <span>INTEGRATION</span>
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  USD Scene Integration
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Build lightweight USD scenes (robot arm, traffic intersection, factory floor). Connect AI inference outputs directly to scene parameters via Python pxr bindings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                Target: &lt; 30ms stage parameter update
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold mb-2">
                  <span>PHASE 3</span>
                  <span>DEMO SUITE</span>
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  Demo Development
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Deploy 3 full showcase tracks: Robotics Pathfinding, Smart Camera Perception &amp; Lighting, and Industrial Digital Twin floor simulation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                3 Turnkey runnable prototypes
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Performance Metrics */}
        <section id="proposal-sec-metrics" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 5</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Performance Metrics
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('metrics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['metrics']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['metrics'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase">
                  <th className="py-3 px-4">Metric</th>
                  <th className="py-3 px-4">Focus Area</th>
                  <th className="py-3 px-4">Jetson Nano Target</th>
                  <th className="py-3 px-4">Cloud Baseline</th>
                  <th className="py-3 px-4">Edge Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {PERFORMANCE_METRICS_LIST.map((m) => (
                  <tr key={m.id} className="hover:bg-zinc-900/50">
                    <td className="py-3.5 px-4 font-bold text-zinc-100">
                      {m.label}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 font-mono">
                      {m.metric}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                      {m.jetsonNanoTarget}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-400">
                      {m.cloudBaseline}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">
                      {m.edgeAdvantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Future Extensions */}
        <section id="proposal-sec-extensions" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 6</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Future Extensions &amp; Scaling Path
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('extensions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['extensions']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['extensions'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-2">
                1. Scale to Jetson Xavier NX / Orin
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Seamless migration to NVIDIA Ampere architecture with dedicated Tensor Cores, unlocking INT4/FP8 quantization and higher-parameter generative transformers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-teal-400 font-bold mb-2">
                2. Hybrid Cloud-Edge Deployment
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Partition reasoning layers: offload heavy reasoning to cloud LLM clusters while guaranteeing sub-40ms safety-critical pathfinding directly on the Nano.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-2">
                3. ROS 2 (Robot Operating System)
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Native bridge connecting OpenUSD scene transformations to ROS 2 Humble micro-controller actuator nodes and Nav2 autonomous navigation stacks.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">
                4. Multi-Device USD Orchestration
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Expand to decentralized multi-agent digital twins where multiple Jetson Nano edge units stream synchronized attribute updates to a unified master stage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Expected Outcomes */}
        <section id="proposal-sec-outcomes" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Section 7</span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Expected Outcomes &amp; Deliverables
                </h2>
              </div>
            </div>

            <button
              onClick={() => toggleSectionApproval('outcomes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors no-print ${
                completedSections['outcomes']
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedSections['outcomes'] ? 'Section Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-2">
                  Deliverable 1
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  Working Prototype
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Demonstrated real-time generative AI + simulation synergy running stably on the NVIDIA Jetson Nano under standard power budgets.
                </p>
              </div>
              <div className="mt-4 text-xs font-mono text-emerald-400 font-semibold">
                ✓ Turnkey Demonstrator
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-teal-400 font-bold uppercase mb-2">
                  Deliverable 2
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  Empirical Benchmarks
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Definitive benchmark datasets proving edge efficiency, zero network latency variance, and compute-per-watt metrics vs. cloud infrastructure.
                </p>
              </div>
              <div className="mt-4 text-xs font-mono text-teal-400 font-semibold">
                ✓ Latency &amp; Power Log
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2">
                  Deliverable 3
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  Portfolio Showcase
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Complete GitHub repository, containerized Docker image, sample OpenUSD stages, and technical whitepaper for robotics and digital twin deployment.
                </p>
              </div>
              <div className="mt-4 text-xs font-mono text-cyan-400 font-semibold">
                ✓ Open Source Assets
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
