import React, { useState } from 'react';
import { Cpu, Camera, Eye, Zap, Layers, RefreshCw, Radio, HardDrive, Monitor } from 'lucide-react';

interface StageNode {
  id: string;
  title: string;
  category: string;
  spec: string;
  details: string;
  accentColor: string;
}

const NODES: StageNode[] = [
  {
    id: 'inputs',
    title: 'Sensors & Vision Ingestion',
    category: 'Hardware Peripherals',
    spec: 'Sony IMX219 CSI-2 + MPU6050 + Ultrasonic',
    details: 'Hardware ISP debayers raw Bayer frames at 1080p@30fps directly into Tegra unified memory without CPU bottleneck.',
    accentColor: 'border-emerald-500/60 text-emerald-400 bg-emerald-950/20'
  },
  {
    id: 'silicon',
    title: 'NVIDIA Jetson Nano SoC',
    category: 'Compute Core',
    spec: 'Quad ARM A57 + 128 Maxwell Cores (472 GFLOPs)',
    details: 'Unified 4GB LPDDR4 memory architecture (25.6 GB/s). Operates within 5W/10W power envelope via J48 barrel jack.',
    accentColor: 'border-teal-500/60 text-teal-400 bg-teal-950/20'
  },
  {
    id: 'tensorrt',
    title: 'TensorRT Inference Engine',
    category: 'AI Acceleration',
    spec: 'FP16 / INT8 Quantized Graphs',
    details: 'Fuses convolution, activation, and pooling layers. Generates sub-45ms inference execution for pathfinding and vision.',
    accentColor: 'border-cyan-500/60 text-cyan-400 bg-cyan-950/20'
  },
  {
    id: 'bridge',
    title: 'Dynamic Scene Bridge',
    category: 'Python pxr API',
    spec: 'Zero-Copy Prim Attribute Mutator',
    details: 'Translates AI output vectors directly into OpenUSD stage attributes (joint transformations, dome light intensity, material shaders).',
    accentColor: 'border-sky-500/60 text-sky-400 bg-sky-950/20'
  },
  {
    id: 'openusd',
    title: 'OpenUSD Stage Graph',
    category: 'Simulation Framework',
    spec: 'USD (.usda / .usdc) Hierarchical Scenegraph',
    details: 'Universal Scene Description maintains physically grounded primitives, collision meshes, and timeline animation tracks.',
    accentColor: 'border-blue-500/60 text-blue-400 bg-blue-950/20'
  },
  {
    id: 'usdview',
    title: 'USDView & Hydra Storm',
    category: 'Visualization & Actuation',
    spec: 'OpenGL 4.6 Context @ 24-30+ FPS',
    details: 'Hydra render delegate paints real-time simulated environment to local HDMI display, with stage export to Omniverse.',
    accentColor: 'border-emerald-400/60 text-emerald-300 bg-emerald-950/30'
  }
];

export const ArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<StageNode>(NODES[2]);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  return (
    <div id="architecture-diagram-container" className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-xl relative overflow-hidden">
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            System Architecture Flow
          </div>
          <h3 className="text-xl font-bold text-zinc-100 tracking-tight mt-1">
            Edge AI Inference &amp; OpenUSD Simulation Pipeline
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="toggle-pulse-btn"
            onClick={() => setPulseAnimation(!pulseAnimation)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pulseAnimation ? 'animate-spin' : ''}`} />
            <span>Dataflow: {pulseAnimation ? 'Live' : 'Paused'}</span>
          </button>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            NVIDIA Jetson Nano (4GB)
          </span>
        </div>
      </div>

      {/* Nodes grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 relative z-10">
        {NODES.map((node, index) => {
          const isSelected = activeNode.id === node.id;
          return (
            <div
              key={node.id}
              id={`arch-node-${node.id}`}
              onClick={() => setActiveNode(node)}
              className={`cursor-pointer rounded-xl p-3.5 border transition-all duration-200 flex flex-col justify-between min-h-[145px] ${
                isSelected
                  ? `${node.accentColor} shadow-lg ring-1 ring-emerald-500/50 scale-[1.02]`
                  : 'border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono opacity-80 mb-1">
                  <span>0{index + 1}</span>
                  <span className="truncate max-w-[85px]">{node.category}</span>
                </div>
                <div className="text-sm font-semibold tracking-tight leading-snug line-clamp-2">
                  {node.title}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-400 truncate">
                {node.spec}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connection pipeline indicator */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2 my-2 text-zinc-600 relative z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 flex items-center justify-center">
            <div className={`h-0.5 w-full bg-gradient-to-r from-emerald-500/20 via-emerald-400/50 to-emerald-500/20 ${pulseAnimation ? 'animate-pulse' : ''}`} />
            <span className="text-emerald-500 text-xs px-1">▶</span>
          </div>
        ))}
      </div>

      {/* Node Detail Inspector Box */}
      <div className="mt-4 rounded-xl border border-zinc-800/90 bg-zinc-900/70 p-4.5 relative z-10 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
          {activeNode.id === 'inputs' && <Camera className="w-6 h-6" />}
          {activeNode.id === 'silicon' && <Cpu className="w-6 h-6" />}
          {activeNode.id === 'tensorrt' && <Zap className="w-6 h-6" />}
          {activeNode.id === 'bridge' && <Layers className="w-6 h-6" />}
          {activeNode.id === 'openusd' && <HardDrive className="w-6 h-6" />}
          {activeNode.id === 'usdview' && <Monitor className="w-6 h-6" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wide">
              {activeNode.category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-sm font-bold text-zinc-100">{activeNode.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
              {activeNode.spec}
            </span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {activeNode.details}
          </p>
        </div>
      </div>
    </div>
  );
};
