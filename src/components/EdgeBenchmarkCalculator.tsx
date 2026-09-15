import React, { useState } from 'react';
import { Cpu, Gauge, Zap, Battery, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const EdgeBenchmarkCalculator: React.FC = () => {
  const [powerMode, setPowerMode] = useState<'5W' | '10W'>('10W');
  const [selectedModel, setSelectedModel] = useState<'sd-lite' | 'whisper' | 'tinyllama'>('tinyllama');
  const [quantization, setQuantization] = useState<'FP16' | 'INT8'>('FP16');
  const [stagePrimCount, setStagePrimCount] = useState<number>(12000);

  // Jetson Nano total physical memory = 4096 MB (Unified CPU + GPU)
  const OS_MEMORY = 950; // Ubuntu 18.04/20.04 L4T base with X11
  
  // Model footprint based on quantization
  const modelMemoryMap: Record<string, { FP16: number; INT8: number; name: string; baseLatency: number }> = {
    'tinyllama': { FP16: 1100, INT8: 620, name: 'GPT2-mini / TinyLlama 1.1B', baseLatency: 42 },
    'whisper': { FP16: 480, INT8: 260, name: 'Whisper Small (Encoder/Decoder)', baseLatency: 180 },
    'sd-lite': { FP16: 1350, INT8: 850, name: 'Stable Diffusion Lite (LCM 256x256)', baseLatency: 920 }
  };

  const selectedModelData = modelMemoryMap[selectedModel];
  const modelMemory = selectedModelData[quantization];

  // USD Stage memory scales with prim count
  const usdStageMemory = Math.round(250 + (stagePrimCount / 1000) * 22);

  // Display/Hydra Storm buffer
  const hydraBuffer = 350;

  // Total allocated
  const totalAllocated = OS_MEMORY + modelMemory + usdStageMemory + hydraBuffer;
  const availableHeadroom = 4096 - totalAllocated;
  const isOOMRisk = availableHeadroom < 300;

  // Latency calculation based on power mode and precision
  const powerMultiplier = powerMode === '10W' ? 1.0 : 1.65;
  const quantMultiplier = quantization === 'INT8' ? 0.68 : 1.0;
  const estimatedLatency = Math.round(selectedModelData.baseLatency * powerMultiplier * quantMultiplier);

  // Viewport FPS estimation
  const baseFPS = powerMode === '10W' ? 34 : 22;
  const primPenalty = Math.max(0, (stagePrimCount - 8000) / 1000) * 0.8;
  const estimatedFPS = Math.max(12, Math.round((baseFPS - primPenalty) * 10) / 10);

  return (
    <div id="benchmark-calculator-card" className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            Hardware Profile &amp; Resource Testbench
          </div>
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight mt-1">
            Jetson Nano 4GB Unified Memory &amp; Latency Estimator
          </h3>
        </div>

        {/* Power mode selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800">
          <button
            id="power-mode-5w"
            onClick={() => setPowerMode('5W')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              powerMode === '5W'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            5W (NVPMON 1)
          </button>
          <button
            id="power-mode-10w"
            onClick={() => setPowerMode('10W')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              powerMode === '10W'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            10W (MAXN 0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Left Column: Interactive Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Select Generative Model
            </label>
            <div className="space-y-2">
              {[
                { id: 'tinyllama', label: 'GPT2-mini / TinyLlama 1.1B', desc: 'Real-time symbolic planning & text' },
                { id: 'whisper', label: 'Whisper Small Audio', desc: 'Zero-latency voice actuation' },
                { id: 'sd-lite', label: 'Stable Diffusion Lite', desc: 'Fast LCM vision synthesis (256x256)' }
              ].map((m) => (
                <button
                  key={m.id}
                  id={`model-select-${m.id}`}
                  onClick={() => setSelectedModel(m.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedModel === m.id
                      ? 'border-emerald-500/80 bg-emerald-950/20 text-emerald-300'
                      : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 text-zinc-300'
                  }`}
                >
                  <div className="text-sm font-semibold">{m.label}</div>
                  <div className="text-xs text-zinc-500 font-mono mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              TensorRT Precision
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="quant-fp16"
                onClick={() => setQuantization('FP16')}
                className={`py-2 px-3 rounded-lg border text-xs font-mono font-semibold transition-all ${
                  quantization === 'FP16'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                FP16 (Half Precision)
              </button>
              <button
                id="quant-int8"
                onClick={() => setQuantization('INT8')}
                className={`py-2 px-3 rounded-lg border text-xs font-mono font-semibold transition-all ${
                  quantization === 'INT8'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                INT8 (Calibrated)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                USD Stage Primitives
              </label>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {stagePrimCount.toLocaleString()} prims
              </span>
            </div>
            <input
              id="stage-prim-slider"
              type="range"
              min="2000"
              max="25000"
              step="1000"
              value={stagePrimCount}
              onChange={(e) => setStagePrimCount(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
              <span>Light Workcell (2k)</span>
              <span>Factory Floor (25k)</span>
            </div>
          </div>
        </div>

        {/* Middle Column: 4GB Memory Budget Meter */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Unified LPDDR4 Footprint
              </span>
              <span className={`text-xs font-mono font-bold ${isOOMRisk ? 'text-amber-400' : 'text-emerald-400'}`}>
                {totalAllocated} MB / 4,096 MB
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="w-full h-4 rounded-full bg-zinc-950 border border-zinc-800 p-0.5 flex overflow-hidden">
              <div
                style={{ width: `${(OS_MEMORY / 4096) * 100}%` }}
                title={`OS & Drivers: ${OS_MEMORY}MB`}
                className="bg-zinc-600 h-full rounded-l-full"
              />
              <div
                style={{ width: `${(modelMemory / 4096) * 100}%` }}
                title={`TensorRT Engine: ${modelMemory}MB`}
                className="bg-emerald-500 h-full"
              />
              <div
                style={{ width: `${(usdStageMemory / 4096) * 100}%` }}
                title={`OpenUSD Stage: ${usdStageMemory}MB`}
                className="bg-teal-400 h-full"
              />
              <div
                style={{ width: `${(hydraBuffer / 4096) * 100}%` }}
                title={`Hydra Viewport: ${hydraBuffer}MB`}
                className="bg-cyan-500 h-full"
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-600 inline-block" />
                <span>OS/Kernel: {OS_MEMORY} MB</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                <span className="text-emerald-400 font-semibold">Model: {modelMemory} MB</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-400 inline-block" />
                <span>USD Stage: {usdStageMemory} MB</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" />
                <span>Hydra VRAM: {hydraBuffer} MB</span>
              </div>
            </div>

            {/* Memory Safety Status */}
            <div className={`mt-4 p-3 rounded-xl border text-xs font-mono flex items-start gap-2.5 ${
              isOOMRisk
                ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
            }`}>
              {isOOMRisk ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold">
                  {isOOMRisk ? 'OOM Risk Advisory: ' : 'Safe Memory Headroom: '}
                </span>
                {availableHeadroom} MB available.
                {isOOMRisk
                  ? ' Recommend enabling ZRAM swap and quantizing model to INT8.'
                  : ' Ample headroom for concurrent sensor buffers and real-time execution.'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
            <span className="text-emerald-400 font-semibold">Note:</span> Jetson Nano shares 4GB unified RAM across both CPU and Maxwell GPU kernels via CUDA Zero-Copy memory pointers.
          </div>
        </div>

        {/* Right Column: Latency & Energy Comparison */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Predicted Edge Performance
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Inference Response:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {estimatedLatency} ms
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">USDView Frame Rate:</span>
                <span className="text-base font-mono font-bold text-teal-300">
                  {estimatedFPS} FPS
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Steady Power Draw:</span>
                <span className="text-base font-mono font-bold text-cyan-300">
                  {powerMode === '10W' ? '8.4W - 9.8W' : '4.2W - 4.9W'}
                </span>
              </div>
            </div>
          </div>

          {/* Edge vs Cloud Callout */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
            <div className="text-xs font-mono text-emerald-400 font-semibold mb-2">
              Edge vs Cloud Comparison
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Network Dependency:</span>
                <span className="font-mono text-emerald-400 font-semibold">0 ms (Offline)</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Cloud API RTT Jitter:</span>
                <span className="font-mono text-zinc-400">±80-250 ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Operating Cost:</span>
                <span className="font-mono text-emerald-400 font-semibold">$0.00 / token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
