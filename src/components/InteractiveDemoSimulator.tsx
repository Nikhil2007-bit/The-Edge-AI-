import React, { useState } from 'react';
import { DEMO_TRACKS } from '../data/proposalData';
import { DemoTrack } from '../types';
import { Play, RotateCcw, Terminal, Layers, Activity, CheckCircle2 } from 'lucide-react';

export const InteractiveDemoSimulator: React.FC = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<'robotics' | 'smart-camera' | 'digital-twin'>('robotics');
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunOutput, setLastRunOutput] = useState<{
    latency: number;
    params: Record<string, string | number>;
    log: string;
  } | null>(null);

  const currentDemo = DEMO_TRACKS.find((d) => d.id === selectedDemoId) || DEMO_TRACKS[0];

  const handleSimulateInference = () => {
    setIsRunning(true);
    // Simulate real edge computation delay
    setTimeout(() => {
      const jitter = (Math.random() * 6 - 3);
      const simulatedLatency = Math.round((currentDemo.simulatedOutput.inferenceTimeMs + jitter) * 10) / 10;
      setLastRunOutput({
        latency: simulatedLatency,
        params: currentDemo.simulatedOutput.usdStageParams,
        log: currentDemo.simulatedOutput.logMessage
      });
      setIsRunning(false);
    }, 450);
  };

  const getPythonSnippet = (demo: DemoTrack) => {
    if (demo.id === 'robotics') {
      return `# Python pxr script running on Jetson Nano
from pxr import Usd, UsdGeom, Gf
import tensorrt as trt

stage = Usd.Stage.Open("robot_workcell.usda")
robot_prim = stage.GetPrimAtPath("/World/RobotArm")

# Execute TensorRT inference engine
joint_angles = trt_engine.infer(sensor_inputs)

# Update OpenUSD stage parameters in real-time
xform = UsdGeom.Xformable(robot_prim)
xform.AddRotateXYZOp().Set(Gf.Vec3f(joint_angles[0], joint_angles[1], joint_angles[2]))
stage.Save()`;
    } else if (demo.id === 'smart-camera') {
      return `# Python pxr dynamic lighting & material update
from pxr import Usd, UsdLux, UsdShade

stage = Usd.Stage.Open("smart_intersection.usda")
dome_light = UsdLux.DomeLight.Get(stage, "/World/Lights/DomeLight")

# Inference detects ambient condition
exposure_val, defect_flag = vision_trt_engine.infer(camera_frame)
dome_light.GetIntensityAttr().Set(1450.0)

# Reflect in inspection shader
material = UsdShade.Material.Get(stage, "/World/Materials/PartShader")
material.CreateInput("defect_state", Sdf.ValueTypeNames.Bool).Set(defect_flag)`;
    } else {
      return `# Factory floor digital twin synchronization loop
from pxr import Usd, UsdGeom

stage = Usd.Stage.Open("factory_floor_mini.usda")
conveyor = stage.GetPrimAtPath("/World/Factory/ConveyorBelt_1")

# Map edge vibration & current telemetry
status, speed = anomaly_model.predict(telemetry_stream)
conveyor.GetAttribute("linear_velocity").Set(speed)
stage.GetPrimAtPath("/World/Factory/Motor_3").GetAttribute("health_state").Set(status)`;
    }
  };

  return (
    <div id="demo-simulator-container" className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Methodology Verification Suite
          </div>
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight mt-1">
            OpenUSD Stage &amp; AI Inference Interactive Simulator
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {DEMO_TRACKS.map((track) => (
            <button
              key={track.id}
              id={`demo-tab-${track.id}`}
              onClick={() => {
                setSelectedDemoId(track.id);
                setLastRunOutput(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                selectedDemoId === track.id
                  ? 'bg-emerald-500 text-zinc-950 shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {track.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Main demo area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left: Description & Step Pipeline (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Target Scene: {currentDemo.usdSceneTarget}
            </span>
            <h4 className="text-base font-bold text-zinc-100 mt-2">
              {currentDemo.title}
            </h4>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              {currentDemo.description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
              Execution Sequence
            </div>
            <div className="space-y-2">
              {currentDemo.pipelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300"
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              id="run-inference-btn"
              disabled={isRunning}
              onClick={handleSimulateInference}
              className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isRunning
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 active:scale-[0.98]'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Running TensorRT Inference...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Simulate Edge Cycle &amp; Update USD Stage
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Live Telemetry & OpenUSD Stage Inspector (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Live Stage Parameters */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <Layers className="w-3.5 h-3.5" />
                Live OpenUSD Stage Primitives (/World)
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Format: .usda text layer
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {Object.entries(lastRunOutput?.params || currentDemo.simulatedOutput.usdStageParams).map(([primPath, val]) => (
                <div
                  key={primPath}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60"
                >
                  <span className="text-zinc-400 truncate max-w-[280px]">{primPath}</span>
                  <span className="text-emerald-400 font-semibold">{val}</span>
                </div>
              ))}
            </div>

            {/* Simulated execution log */}
            <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-zinc-400">Response Latency:</span>
                <span className="font-bold text-emerald-400">
                  {lastRunOutput ? lastRunOutput.latency : currentDemo.simulatedOutput.inferenceTimeMs} ms
                </span>
              </div>
              <span className="text-[11px] text-zinc-500">
                Target: {currentDemo.edgeLatencyTarget}
              </span>
            </div>
          </div>

          {/* Python pxr implementation preview */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 mb-2">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>pxr.Usd Python Binding Implementation</span>
              </div>
              <span className="text-[10px] text-zinc-500">Jetson Nano py3.8</span>
            </div>
            <pre className="text-[11px] text-zinc-300 overflow-x-auto leading-relaxed flex-1 p-2 rounded bg-zinc-900/40">
              <code>{getPythonSnippet(currentDemo)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
