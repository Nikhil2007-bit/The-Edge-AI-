import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceLine 
} from 'recharts';
import { 
  Cpu, 
  Activity, 
  Flame, 
  Fan, 
  Zap, 
  HardDrive, 
  X, 
  RefreshCw, 
  AlertTriangle, 
  Play, 
  Square, 
  Terminal, 
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface HardwareHealthWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

interface MemoryDataPoint {
  time: string;
  gpuMemory: number;
  totalRam: number;
}

export const HardwareHealthWidget: React.FC<HardwareHealthWidgetProps> = ({
  isOpen,
  onClose,
  onToggle
}) => {
  const [isSimulatingWorkload, setIsSimulatingWorkload] = useState(false);
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true);
  const [showTegrastatsLog, setShowTegrastatsLog] = useState(false);

  // Dynamic telemetry metrics with jitter
  const [metrics, setMetrics] = useState({
    cpuTemp: 44.5,
    gpuTemp: 46.2,
    fanRpm: 2150,
    fanDuty: 42,
    ramUsedMb: 2180,
    gpuMemoryMb: 940,
    zramUsedMb: 340,
    gpuLoad: 28,
    cpuLoad: 22,
    powerWatts: 6.4,
    voltageVolts: 5.06,
    currentAmps: 1.26
  });

  // History buffer for Recharts real-time line chart
  const [memoryHistory, setMemoryHistory] = useState<MemoryDataPoint[]>(() => {
    const points: MemoryDataPoint[] = [];
    const now = Date.now();
    for (let i = 11; i >= 0; i--) {
      const t = new Date(now - i * 1800);
      const timeStr = `${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`;
      const baseGpu = 920 + Math.round(Math.sin(i * 0.9) * 35 + ((i % 3) * 12));
      points.push({
        time: timeStr,
        gpuMemory: baseGpu,
        totalRam: 2140 + Math.round(Math.sin(i * 0.8) * 45)
      });
    }
    return points;
  });

  useEffect(() => {
    if (!isLiveTelemetry) return;

    const interval = setInterval(() => {
      setMetrics((prev) => {
        const jitter = (Math.random() - 0.5);
        if (isSimulatingWorkload) {
          // Stressed values under active generative workload
          const nextRam = Math.min(3450, Math.max(3180, Math.round(prev.ramUsedMb + jitter * 35)));
          const nextGpuMem = Math.min(2350, Math.max(1880, Math.round(1980 + (prev.gpuLoad * 3.8) + (jitter * 45))));
          
          return {
            cpuTemp: Math.min(76, Math.max(68, +(prev.cpuTemp + jitter * 1.5).toFixed(1))),
            gpuTemp: Math.min(78, Math.max(71, +(prev.gpuTemp + jitter * 1.8).toFixed(1))),
            fanRpm: Math.min(4800, Math.max(4100, Math.round(prev.fanRpm + jitter * 80))),
            fanDuty: Math.min(88, Math.max(78, Math.round(prev.fanDuty + jitter * 2))),
            ramUsedMb: nextRam,
            gpuMemoryMb: nextGpuMem,
            zramUsedMb: Math.min(680, Math.max(520, Math.round(prev.zramUsedMb + jitter * 15))),
            gpuLoad: Math.min(96, Math.max(82, Math.round(prev.gpuLoad + jitter * 4))),
            cpuLoad: Math.min(82, Math.max(64, Math.round(prev.cpuLoad + jitter * 5))),
            powerWatts: Math.min(9.8, Math.max(9.1, +(prev.powerWatts + jitter * 0.15).toFixed(2))),
            voltageVolts: 5.04,
            currentAmps: +(prev.powerWatts / 5.04).toFixed(2)
          };
        } else {
          // Idle / nominal values
          const nextRam = Math.min(2350, Math.max(2080, Math.round(prev.ramUsedMb + jitter * 15)));
          const nextGpuMem = Math.min(1060, Math.max(820, Math.round(880 + (prev.gpuLoad * 2.2) + (jitter * 20))));

          return {
            cpuTemp: Math.min(48, Math.max(42, +(prev.cpuTemp + jitter * 0.6).toFixed(1))),
            gpuTemp: Math.min(50, Math.max(44, +(prev.gpuTemp + jitter * 0.7).toFixed(1))),
            fanRpm: Math.min(2400, Math.max(1900, Math.round(prev.fanRpm + jitter * 40))),
            fanDuty: Math.min(45, Math.max(36, Math.round(prev.fanDuty + jitter))),
            ramUsedMb: nextRam,
            gpuMemoryMb: nextGpuMem,
            zramUsedMb: Math.min(390, Math.max(310, Math.round(prev.zramUsedMb + jitter * 5))),
            gpuLoad: Math.min(38, Math.max(18, Math.round(prev.gpuLoad + jitter * 3))),
            cpuLoad: Math.min(32, Math.max(14, Math.round(prev.cpuLoad + jitter * 3))),
            powerWatts: Math.min(6.8, Math.max(5.9, +(prev.powerWatts + jitter * 0.1).toFixed(2))),
            voltageVolts: 5.08,
            currentAmps: +(prev.powerWatts / 5.08).toFixed(2)
          };
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isLiveTelemetry, isSimulatingWorkload]);

  // Sync memoryHistory whenever metrics.gpuMemoryMb updates
  useEffect(() => {
    const d = new Date();
    const timeStr = `${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    setMemoryHistory((prev) => [
      ...prev.slice(-14),
      {
        time: timeStr,
        gpuMemory: metrics.gpuMemoryMb,
        totalRam: metrics.ramUsedMb
      }
    ]);
  }, [metrics.gpuMemoryMb, metrics.ramUsedMb]);

  // Fan rotation speed class based on RPM
  const getFanSpeedClass = () => {
    if (metrics.fanDuty > 70) return 'animate-spin [animation-duration:0.35s]';
    if (metrics.fanDuty > 45) return 'animate-spin [animation-duration:0.8s]';
    return 'animate-spin [animation-duration:1.5s]';
  };

  const isTempHigh = metrics.gpuTemp > 75 || metrics.cpuTemp > 74;
  const ramPercent = Math.round((metrics.ramUsedMb / 4096) * 100);

  // Raw mock tegrastats output
  const tegrastatsOutput = `RAM ${metrics.ramUsedMb}/4096MB (lfb 182x4MB) SWAP ${metrics.zramUsedMb}/2048MB (cached 14MB) CPU [${metrics.cpuLoad}%@1428,${Math.max(10, metrics.cpuLoad - 8)}%@1428,${Math.max(8, metrics.cpuLoad - 4)}%@1428,${Math.max(12, metrics.cpuLoad - 6)}%@1428] EMC_FREQ ${metrics.gpuLoad > 50 ? '82%' : '24%'}@1600 GR3D_FREQ ${metrics.gpuLoad}%@921 APE 25 PLL@${Math.round(metrics.cpuTemp)}C CPU@${metrics.cpuTemp}C PMIC@50C GPU@${metrics.gpuTemp}C AO@49C thermal@${metrics.gpuTemp}C POM_5V_IN ${Math.round(metrics.powerWatts * 1000)}/${Math.round(metrics.powerWatts * 1000)}`;

  return (
    <>
      {/* Floating mini trigger widget button (visible when closed) */}
      {!isOpen && (
        <button
          id="open-hardware-health-btn"
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-zinc-900/95 hover:bg-zinc-850 text-zinc-200 border border-zinc-700/80 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
          title="Open Jetson Nano Hardware Health Monitor"
        >
          <div className="relative">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950 animate-pulse" />
          </div>
          
          <div className="text-left font-mono text-xs hidden sm:block">
            <div className="text-[10px] uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
              <span>Jetson SoC Health</span>
              <span className="text-emerald-400 font-bold">• 10W</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200 font-bold">
              <span className={isTempHigh ? 'text-amber-400' : 'text-emerald-400'}>
                {metrics.gpuTemp}°C
              </span>
              <span className="text-zinc-600">|</span>
              <span>{metrics.fanRpm} RPM</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{ramPercent}% RAM</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
        </button>
      )}

      {/* Main Hardware Health Sidebar Drawer */}
      {isOpen && (
        <aside
          id="hardware-health-sidebar"
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 select-none overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-800/90 flex items-center justify-between bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-zinc-100 tracking-tight">
                    Jetson Nano Hardware Health
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                  <span>MAXN 10W Mode</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">Tegra210 SoC</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="toggle-telemetry-live-btn"
                onClick={() => setIsLiveTelemetry(!isLiveTelemetry)}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors ${
                  isLiveTelemetry
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
                title={isLiveTelemetry ? 'Pause telemetry stream' : 'Resume live stream'}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLiveTelemetry ? 'animate-spin [animation-duration:4s]' : ''}`} />
              </button>
              <button
                id="close-hardware-health-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors"
                title="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body content with scrolling */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-xs">
            {/* Workload Stress Simulator Banner */}
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-zinc-200">
                  {isSimulatingWorkload ? 'Workload Active: Generative Pipeline' : 'Idle Baseline'}
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  {isSimulatingWorkload
                    ? 'TensorRT FP16 + OpenUSD 28 FPS simulation running'
                    : 'System resting at standby telemetry'}
                </div>
              </div>

              <button
                id="toggle-stress-test-btn"
                onClick={() => setIsSimulatingWorkload(!isSimulatingWorkload)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 ${
                  isSimulatingWorkload
                    ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                }`}
              >
                {isSimulatingWorkload ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Load</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Stress Test</span>
                  </>
                )}
              </button>
            </div>

            {/* Metric 1: Temperature & Thermal Zones */}
            <div className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2 font-semibold">
                  <Flame className={`w-4 h-4 ${isTempHigh ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span className="text-zinc-200">Thermal Zones</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                  isTempHigh 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {isTempHigh ? 'Elevated Load' : 'Thermal Nominal'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-[10px] text-zinc-500">GPU Maxwell Core</div>
                  <div className={`text-xl font-bold mt-1 ${isTempHigh ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {metrics.gpuTemp}°C
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">Trip limit: 85.0°C</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-[10px] text-zinc-500">CPU Quad A57</div>
                  <div className={`text-xl font-bold mt-1 ${isTempHigh ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {metrics.cpuTemp}°C
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">Trip limit: 85.0°C</div>
                </div>
              </div>

              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    isTempHigh ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (metrics.gpuTemp / 85) * 100)}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Active Fan Speed (PWM) */}
            <div className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2 font-semibold">
                  <Fan className={`w-4 h-4 text-emerald-400 ${getFanSpeedClass()}`} />
                  <span className="text-zinc-200">Active Cooling Fan</span>
                </div>
                <span className="text-emerald-400 font-bold">PWM: {metrics.fanDuty}%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <div>
                  <div className="text-[10px] text-zinc-500">Brushless Tachometer</div>
                  <div className="text-lg font-bold text-zinc-100 mt-0.5">
                    {metrics.fanRpm} <span className="text-xs font-normal text-zinc-500">RPM</span>
                  </div>
                </div>
                <div className="text-right text-[10px] text-zinc-400">
                  <div>Control: <strong className="text-zinc-200">nvfancontrol</strong></div>
                  <div>Target Temp: <strong className="text-emerald-400">&lt;65°C</strong></div>
                </div>
              </div>
            </div>

            {/* Metric 3: Unified Memory Footprint & Real-Time GPU Memory Line Chart */}
            <div className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2 font-semibold">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-200">GPU Memory &amp; VRAM Pool</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">{metrics.gpuMemoryMb} MB</span>
                  <span className="text-zinc-500">/ 4,096 MB</span>
                </div>
              </div>

              {/* Total RAM progress */}
              <div>
                <div className="flex justify-between text-[11px] mb-1.5 text-zinc-300 font-mono">
                  <span>Unified RAM Alloc:</span>
                  <span className="font-bold text-zinc-100">
                    {metrics.ramUsedMb} MB ({ramPercent}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${ramPercent}%` }}
                  />
                </div>
              </div>

              {/* Recharts Line Chart: Real-time GPU memory usage fluctuations */}
              <div className="pt-2 border-t border-zinc-800/60">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2 font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-200 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-Time GPU VRAM Fluctuations</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                    Live Telemetry
                  </span>
                </div>

                <div className="h-28 w-full bg-zinc-950/90 rounded-lg p-2 border border-zinc-800/80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memoryHistory} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} vertical={false} />
                      <XAxis 
                        dataKey="time" 
                        tick={{ fill: '#71717a', fontSize: 9, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={{ stroke: '#27272a' }}
                      />
                      <YAxis 
                        domain={['dataMin - 80', 'dataMax + 80']}
                        tick={{ fill: '#71717a', fontSize: 9, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                        unit="M"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#09090b',
                          borderColor: '#27272a',
                          borderRadius: '0.5rem',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          padding: '6px 10px',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.6)'
                        }}
                        labelStyle={{ color: '#a1a1aa', fontSize: '10px', marginBottom: '2px' }}
                        formatter={(value: any) => [`${value} MB`, 'GPU Memory (VRAM)']}
                      />
                      <Line
                        type="monotone"
                        dataKey="gpuMemory"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#34d399', stroke: '#064e3b', strokeWidth: 2 }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 font-mono">
                <span>ZRAM Swap: {metrics.zramUsedMb} MB</span>
                <span className="text-zinc-500">Bandwidth: 25.6 GB/s</span>
              </div>
            </div>

            {/* Metric 4: Utilization & Power Draw */}
            <div className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2 font-semibold">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-zinc-200">Compute Load &amp; Power</span>
                </div>
                <span className="text-cyan-400 font-bold">5V/4A Barrel</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-[10px] text-zinc-500">128 Maxwell GPU</div>
                  <div className="text-base font-bold text-zinc-200 mt-0.5">
                    {metrics.gpuLoad}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-[10px] text-zinc-500">Quad ARM A57</div>
                  <div className="text-base font-bold text-zinc-200 mt-0.5">
                    {metrics.cpuLoad}%
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-[10px] text-zinc-500">Power Draw</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {metrics.powerWatts}W
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-[10px] text-zinc-500">Current / Voltage</div>
                  <div className="text-base font-bold text-zinc-200 mt-0.5">
                    {metrics.currentAmps}A @ {metrics.voltageVolts}V
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Raw Tegrastats Output */}
            <div className="pt-1">
              <button
                id="toggle-tegrastats-btn"
                onClick={() => setShowTegrastatsLog(!showTegrastatsLog)}
                className="w-full py-2 px-3 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-[11px] text-zinc-400 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Raw tegrastats Stream</span>
                </div>
                <span>{showTegrastatsLog ? 'Hide' : 'Inspect'}</span>
              </button>

              {showTegrastatsLog && (
                <pre className="mt-2 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] text-emerald-400/90 leading-tight overflow-x-auto whitespace-pre-wrap">
                  <code>{tegrastatsOutput}</code>
                </pre>
              )}
            </div>
          </div>

          {/* Footer status summary */}
          <div className="p-4 border-t border-zinc-800/90 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Silicon Guard: Active</span>
            </div>
            <span className="text-zinc-500">nvpmodel -m 0</span>
          </div>
        </aside>
      )}
    </>
  );
};
