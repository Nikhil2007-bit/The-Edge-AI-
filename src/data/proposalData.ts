import { DemoTrack, HardwareItem, PerformanceMetric, ProposalSection, SlideContent, SoftwareComponent } from '../types';

export const RAW_MARKDOWN_PROPOSAL = `# 🚀 Project Proposal: The Edge AI & Simulation Project  
**Platform:** NVIDIA Jetson Nano  
**Focus:** Real-time Generative AI inference + OpenUSD scene simulation  

---

## 1. 🎯 Objectives
- Showcase Jetson Nano as a **dedicated edge AI hub** for generative inference and simulation.  
- Demonstrate **real-time performance** of lightweight generative models (text-to-image, speech synthesis, small-scale LLMs).  
- Integrate **OpenUSD scenes** for robotics, AR/VR, and digital twin applications.  
- Highlight **advantages of edge deployment**: offline capability, low latency, and energy efficiency.  

---

## 2. ⚙️ Hardware Setup
- **Jetson Nano Developer Kit** (Quad-core ARM Cortex-A57 CPU, 128-core Maxwell GPU, 4GB RAM).  
- **Peripherals:**  
  - Camera module (CSI or USB)  
  - Sensors (IMU, ultrasonic, IR) for robotics demo  
  - HDMI display for visualization  
  - Optional: Wi-Fi dongle, external storage  

---

## 3. 🖥️ Software Stack
- **AI Inference:**  
  - PyTorch + TensorRT for optimized model deployment  
  - Pre-trained lightweight generative models (Stable Diffusion Lite, Whisper small, GPT2-mini)  
- **Simulation:**  
  - OpenUSD (Universal Scene Description) for scene orchestration  
  - USDView for visualization  
- **System Tools:**  
  - Docker containers for reproducible environments  
  - JetPack SDK for GPU acceleration  

---

## 4. 🔧 Methodology
1. **Model Optimization**  
   - Quantize and prune generative models for Nano’s GPU.  
   - Benchmark latency, FPS, and energy consumption.  

2. **USD Scene Integration**  
   - Build lightweight USD scenes (robot arm, traffic intersection, factory floor).  
   - Connect AI inference outputs to scene parameters (e.g., robot behavior adapts based on generated text/image).  

3. **Demo Development**  
   - **Robotics Simulation:** Nano runs a generative model to adapt robot pathfinding in real-time.  
   - **Smart Camera System:** AI enhances captured frames, USD models simulate environment.  
   - **Digital Twin Demo:** Nano simulates a miniature factory floor with USD scenes.  

---

## 5. 📊 Performance Metrics
- **Latency:** Model response time (ms).  
- **Throughput:** Frames per second (FPS) for simulation.  
- **Energy Efficiency:** Power draw during inference vs. cloud offloading.  
- **Interoperability:** Ability to share USD scenes across devices.  

---

## 6. 🔮 Future Extensions
- Scale to **Jetson Xavier NX / Jetson Orin** for larger models.  
- Hybrid **cloud-edge deployment**: offload heavy inference to cloud, keep real-time tasks on Nano.  
- Integration with **ROS (Robot Operating System)** for robotics applications.  
- Expand to **multi-device USD orchestration** for collaborative digital twins.  

---

## 7. 📌 Expected Outcomes
- A **working prototype** demonstrating generative AI + simulation synergy on Jetson Nano.  
- Benchmarks proving **edge efficiency** vs. cloud inference.  
- A **portfolio-ready showcase** for robotics, smart vision, and digital twin applications.  
`;

export const PROPOSAL_SECTIONS: ProposalSection[] = [
  {
    id: 'objectives',
    number: 1,
    title: 'Objectives',
    icon: 'Target',
    summary: 'Establish the Jetson Nano as a high-efficiency edge hub coupling lightweight generative AI models with real-time OpenUSD scene simulation.',
    content: [
      'Showcase Jetson Nano as a dedicated edge AI hub for generative inference and simulation.',
      'Demonstrate real-time performance of lightweight generative models (text-to-image, speech synthesis, small-scale LLMs).',
      'Integrate OpenUSD scenes for robotics, AR/VR, and digital twin applications.',
      'Highlight advantages of edge deployment: offline capability, zero round-trip cloud latency, strict privacy, and low power consumption.'
    ],
    subsections: [
      {
        title: 'Core Value Proposition & Edge Advantages',
        items: [
          'Autonomous Edge Execution: Zero internet dependency enables continuous field deployment in industrial and robotic contexts.',
          'Deterministic Low Latency: Sub-100ms local inference avoids unpredictable cellular/WAN network jitter.',
          'Data Privacy & Security: High-resolution camera and sensor payloads are processed on-die without leaking outside the perimeter.',
          'Sub-10W Energy Efficiency: Operates on modest DC power or battery packs with exceptional compute-per-watt.'
        ]
      }
    ],
    tags: ['Edge AI', 'OpenUSD', 'Low Latency', 'Offline-First']
  },
  {
    id: 'hardware',
    number: 2,
    title: 'Hardware Setup',
    icon: 'Cpu',
    summary: 'Target architecture specifications centered on the 128-core Maxwell GPU with full peripheral sensor arrays and high-speed telemetry.',
    content: [
      'Jetson Nano Developer Kit: Quad-core ARM Cortex-A57 CPU @ 1.43 GHz, 128-core NVIDIA Maxwell GPU, 4GB 64-bit LPDDR4 (25.6 GB/s).',
      'Camera module: Sony IMX219 8MP CSI-2 camera (high-throughput low CPU overhead) or USB 3.0 UVC webcam.',
      'Peripherals & Sensors: 6-DOF IMU (MPU6050/9250), Ultrasonic HC-SR04 distance sensors, and active Infrared proximity arrays.',
      'Display & Telemetry: HDMI 2.0 / DisplayPort for real-time USDView 3D viewport rendering.',
      'Power & Expansion: 5V/4A DC barrel jack (10W performance mode enabled via J48 jumper), High-end UHS-I/V30 MicroSD card / USB 3.0 NVMe SSD, and optional Intel Dual-Band Wi-Fi.'
    ],
    subsections: [
      {
        title: 'System Specifications Breakdown',
        items: [
          'GPU: 128-core NVIDIA Maxwell architecture @ 921 MHz (472 GFLOPs FP16 compute)',
          'CPU: Quad-Core ARM Cortex-A57 MPCore processor @ 1.43 GHz',
          'Memory: 4 GB 64-bit LPDDR4 @ 1600 MHz (Unified Memory Architecture shared between CPU and GPU)',
          'Power Modes: 5W low-power mode vs. 10W standard mode (NVPMON power management)',
          'Thermal: Passive aluminum heatsink with PWM fan attachment for sustained non-throttling inference'
        ]
      }
    ],
    tags: ['NVIDIA Maxwell', 'ARM Cortex-A57', 'CSI-2', '4GB LPDDR4']
  },
  {
    id: 'software',
    number: 3,
    title: 'Software Stack',
    icon: 'Layers',
    summary: 'Optimized inference engines and 3D simulation framework orchestrated via containerized JetPack environments.',
    content: [
      'AI Inference Engine: PyTorch 2.x with NVIDIA TensorRT (FP16 / INT8 precision pruning) for accelerated graph execution.',
      'Generative Model Portfolio: Pre-trained lightweight models tuned for 4GB VRAM footprint (Stable Diffusion Lite / LCM-LoRA, Whisper small / faster-whisper, and GPT2-mini / TinyLlama 1.1B).',
      'Simulation Framework: Pixar OpenUSD (Universal Scene Description) with Python bindings (pxr library) for procedural scene generation.',
      'Visualization: USDView / Hydra render delegates (Storm / custom rasterizer) rendered over local display or streaming WebSocket.',
      'Operating System & Tools: NVIDIA JetPack SDK 4.6.x (Linux for Tegra / Ubuntu 18.04/20.04 LTS), CUDA 10.2, cuDNN 8.x, and Docker containers with NVIDIA Container Runtime.'
    ],
    subsections: [
      {
        title: 'Inference Stack Configuration',
        items: [
          'TensorRT compilation with dynamic batching and FP16 half-precision kernels',
          'OpenUSD pxr.Usd and pxr.UsdGeom integration for dynamic stage authoring',
          'Zero-copy unified memory buffers via Jetson Multimedia API (V4L2 + NvBuffer)'
        ],
        codeSnippet: `# Convert PyTorch model to TensorRT engine on Jetson Nano
/usr/src/tensorrt/bin/trtexec \\
  --onnx=model_opt.onnx \\
  --saveEngine=model_nano.engine \\
  --fp16 \\
  --workspace=512 \\
  --explicitBatch`
      }
    ],
    tags: ['TensorRT', 'PyTorch', 'OpenUSD (pxr)', 'JetPack SDK', 'Docker']
  },
  {
    id: 'methodology',
    number: 4,
    title: 'Methodology',
    icon: 'Workflow',
    summary: 'Three-phase technical execution plan spanning hardware quantization, procedural USD orchestration, and interactive real-world demos.',
    content: [
      'Phase 1: Model Optimization — Quantize (FP16/INT8), layer-prune, and benchmark generative architectures specifically for the Maxwell microarchitecture.',
      'Phase 2: USD Scene Integration — Build lightweight, procedural USD asset graphs (robot arm, traffic intersection, factory floor) with dynamic stage attributes driven by real-time AI tensors.',
      'Phase 3: Demo Development — Complete 3 end-to-end demonstrations proving generative decision-making and digital twin synergy directly on the edge.'
    ],
    subsections: [
      {
        title: '1. Model Optimization Pipeline',
        items: [
          'Weights & Activations quantization: Convert FP32 models to FP16 and calibrated INT8.',
          'Memory profiling: Enforce maximum 2.2GB GPU memory footprint to ensure system stability on 4GB unified RAM.',
          'Benchmarking harness: Measure time-to-first-token (TTFT), inference latency per step, and steady-state wattage.'
        ]
      },
      {
        title: '2. USD Scene Integration Strategy',
        items: [
          'Construct parametric USD assets using OpenUSD Python bindings (pxr.Usd, pxr.UsdGeom).',
          'Bridge AI output vectors directly to USD stage attributes (joint rotations, lighting temperature, material distress).',
          'Establish a sub-30ms USD stage update cycle matching simulation tick rates.'
        ]
      },
      {
        title: '3. Core Demo Tracks',
        items: [
          'Robotics Simulation: Nano executes generative pathfinding model to navigate dynamic obstacles in an OpenUSD robotic workcell.',
          'Smart Camera System: On-device generative vision filters and classifies camera frames, dynamically updating a digital twin environment.',
          'Digital Twin Demo: Nano simulates a miniature factory floor with synchronized conveyor belts, quality inspection alerts, and spatial telemetry.'
        ]
      }
    ],
    tags: ['Quantization', 'Dynamic Attributes', 'Pathfinding', 'Digital Twin']
  },
  {
    id: 'metrics',
    number: 5,
    title: 'Performance Metrics',
    icon: 'Gauge',
    summary: 'Concrete quantitative benchmarks evaluating real-time responsiveness, rendering throughput, power envelope, and asset interoperability.',
    content: [
      'Latency: End-to-end model inference response time measured in milliseconds (ms).',
      'Throughput: Simulation frame rate (FPS) maintaining responsive viewport interaction.',
      'Energy Efficiency: Measured power draw (Watts) and compute efficiency vs. round-trip cloud offload.',
      'Interoperability: Seamless portability of OpenUSD assets across USDView, Isaac Sim, and Omniverse workstations.'
    ],
    subsections: [
      {
        title: 'Quantitative Benchmark Targets',
        items: [
          'Generative Vision Latency: < 1,500ms for SD-Lite 256x256 (4 steps with LCM-LoRA / TensorRT FP16)',
          'Text / Speech Latency: < 45ms per token for GPT2-mini / TinyLlama; < 250ms for Whisper small speech chunk',
          'USD Viewport Simulation: Sustained 24 - 30+ FPS for 10k-polygon dynamic workcell scene',
          'System Power Draw: ≤ 9.5W peak during combined inference and viewport rendering (vs. 150W+ cloud server node)'
        ]
      }
    ],
    tags: ['Latency (ms)', 'Simulation FPS', 'Power Draw (W)', 'Interoperability']
  },
  {
    id: 'extensions',
    number: 6,
    title: 'Future Extensions',
    icon: 'Sparkles',
    summary: 'Strategic growth roadmap addressing high-tier Jetson silicon, cloud-edge hybrid partitioning, and industrial ROS/Omniverse scaling.',
    content: [
      'Scale to Jetson Xavier NX / Jetson Orin: Transition to Ampere/Volta architecture with Tensor Cores for 5x–20x generative model throughput.',
      'Hybrid Cloud-Edge Deployment: Offload massive foundational models (10B+) to cloud infrastructure while keeping real-time safety critical loops on Nano.',
      'ROS 2 (Robot Operating System) Integration: Connect USD simulation parameters directly to ROS 2 Humble nodes and micro-ROS microcontroller actuators.',
      'Multi-Device USD Orchestration: Implement collaborative digital twins where multiple Jetson nodes update a shared OpenUSD stage in real time.'
    ],
    subsections: [
      {
        title: 'Hardware Upgrade Path Comparison',
        items: [
          'Jetson Nano (Current): 472 GFLOPs, 4GB LPDDR4, Maxwell architecture, 5W-10W TDP',
          'Jetson Xavier NX (Mid-Tier): 21 TOPS, 8GB LPDDR4x, Volta w/ 48 Tensor Cores, 10W-15W TDP',
          'Jetson Orin Nano / AGX Orin (Next-Gen): 40 to 275 TOPS, 8GB-64GB LPDDR5, Ampere architecture'
        ]
      }
    ],
    tags: ['Jetson Orin', 'Hybrid Architecture', 'ROS 2', 'Multi-Agent']
  },
  {
    id: 'outcomes',
    number: 7,
    title: 'Expected Outcomes',
    icon: 'CheckCircle',
    summary: 'Definitive engineering deliverables proving autonomous edge capability and creating a reproducible open-source portfolio asset.',
    content: [
      'Working Prototype: Fully functional hardware-software system demonstrating generative AI inference and OpenUSD simulation running concurrently on Jetson Nano.',
      'Empirical Benchmarks: Comprehensive empirical dataset proving edge efficiency, thermal profile, and latency advantages over cloud endpoints.',
      'Portfolio-Ready Showcase: Documented code repository, open-source USD assets, interactive demonstration suite, and technical whitepaper suitable for conference or engineering review.'
    ],
    subsections: [
      {
        title: 'Deliverables Checklist',
        items: [
          '1. Containerized Docker image containing optimized TensorRT engines and OpenUSD runtime.',
          '2. Modular Python package integrating pxr.Usd stage manipulator with TensorRT output bindings.',
          '3. Three turnkey demo applications with automated startup scripts (Robotics, Camera, Digital Twin).',
          '4. Formal benchmark whitepaper featuring power, latency, and thermal telemetry charts.'
        ]
      }
    ],
    tags: ['Functional Prototype', 'Empirical Benchmarks', 'Technical Portfolio', 'OpenUSD Assets']
  }
];

export const INITIAL_HARDWARE_INVENTORY: HardwareItem[] = [
  {
    id: 'hw-1',
    name: 'Jetson Nano Developer Kit (B01)',
    category: 'core',
    specification: 'Quad-core ARM A57, 128-core Maxwell GPU, 4GB 64-bit LPDDR4',
    status: 'ready',
    notes: 'J48 power jumper shorted for 10W barrel jack mode. Firmware flashed with JetPack 4.6.1.',
    interfaceType: 'Carrier Board'
  },
  {
    id: 'hw-2',
    name: 'Sony IMX219 Camera Module',
    category: 'peripherals',
    specification: '8MP sensor, 1080p@30fps / 720p@60fps, 77° FOV lens',
    status: 'ready',
    notes: 'Connected via 15-pin MIPI CSI-2 Ribbon cable (Port CAM0). Tested via nvarguscamerasrc.',
    interfaceType: 'MIPI CSI-2'
  },
  {
    id: 'hw-3',
    name: 'MPU-6050 6-DOF IMU Sensor',
    category: 'peripherals',
    specification: '3-axis Gyroscope + 3-axis Accelerometer, I2C bus',
    status: 'testing',
    notes: 'Wired to I2C-1 (Pins 3 & 5 on 40-pin expansion header). Real-time gravity vector streaming.',
    interfaceType: 'I2C (Pin 3/5)'
  },
  {
    id: 'hw-4',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    category: 'peripherals',
    specification: '2cm - 400cm non-contact range, 5V trigger with voltage divider',
    status: 'testing',
    notes: 'Requires 5V to 3.3V resistor voltage divider on Echo pin to protect Jetson 3.3V GPIOs.',
    interfaceType: 'GPIO (3.3V logic)'
  },
  {
    id: 'hw-5',
    name: '5V / 4A DC Power Supply (Barrel Jack)',
    category: 'power_storage',
    specification: 'Center-positive 5.5x2.1mm, 20W continuous delivery',
    status: 'ready',
    notes: 'Mandatory for high GPU utilization to prevent brownout crashes caused by Micro-USB 2A limit.',
    interfaceType: '5.5x2.1mm DC'
  },
  {
    id: 'hw-6',
    name: '128GB High-Speed MicroSD / NVMe',
    category: 'power_storage',
    specification: 'UHS-I U3 / A2 rating (minimum 90MB/s sequential read)',
    status: 'ready',
    notes: 'Configured with 8GB ZRAM swap to prevent Out-Of-Memory (OOM) killer during model loads.',
    interfaceType: 'UHS-I Slot / USB3'
  },
  {
    id: 'hw-7',
    name: 'HDMI 2.0 Display Monitor',
    category: 'peripherals',
    specification: '1080p 60Hz monitor for real-time USDView viewport display',
    status: 'ready',
    notes: 'Supports OpenGL 4.6 context required by OpenUSD Hydra Storm renderer delegate.',
    interfaceType: 'HDMI 2.0'
  },
  {
    id: 'hw-8',
    name: 'Active Cooling PWM Heatsink Fan',
    category: 'optional',
    specification: '5V 4-pin PWM brushless fan mounted on aluminum radiator',
    status: 'ready',
    notes: 'Controlled via nvfancontrol script to maintain silicon temps below 65°C under sustained load.',
    interfaceType: '4-pin PWM'
  }
];

export const SOFTWARE_COMPONENTS: SoftwareComponent[] = [
  {
    name: 'NVIDIA JetPack SDK',
    category: 'system',
    version: '4.6.1 (L4T 32.7.1)',
    role: 'Operating System, Linux Kernel, CUDA 10.2, and cuDNN 8.2 drivers for Maxwell GPU.',
    commandSnippet: 'jetson_release -v'
  },
  {
    name: 'NVIDIA TensorRT',
    category: 'inference',
    version: '8.2.1',
    role: 'Deep learning inference optimizer; compiles PyTorch/ONNX models into calibrated FP16 engines.',
    commandSnippet: 'dpkg -l | grep nvinfer'
  },
  {
    name: 'PyTorch for Jetson',
    category: 'inference',
    version: '1.10.0 / 2.0.0 (aarch64)',
    role: 'Python deep learning framework compiled specifically for ARM64 Tegra architecture with CUDA.',
    commandSnippet: 'python3 -c "import torch; print(torch.__version__, torch.cuda.is_available())"'
  },
  {
    name: 'OpenUSD (Pixar USD)',
    category: 'simulation',
    version: '22.08 / 23.05',
    role: 'Universal Scene Description core library with Python pxr bindings for dynamic scene orchestration.',
    commandSnippet: 'python3 -c "from pxr import Usd, UsdGeom; print(Usd.__file__)"'
  },
  {
    name: 'USDView & Hydra Storm',
    category: 'simulation',
    version: '22.08',
    role: 'Real-time interactive OpenGL viewport renderer visualising USD primitives and lights.',
    commandSnippet: 'usdview path/to/scene.usda'
  },
  {
    name: 'NVIDIA Container Toolkit',
    category: 'system',
    version: '2.0.0 (nvidia-docker2)',
    role: 'Enables GPU-accelerated Docker containers on Jetson Nano for zero-friction reproducibility.',
    commandSnippet: 'sudo docker run --runtime nvidia --rm nvcr.io/nvidia/l4t-base:r32.7.1 nvidia-smi'
  }
];

export const DEMO_TRACKS: DemoTrack[] = [
  {
    id: 'robotics',
    title: 'Robotics Simulation & Adaptive Pathfinding',
    badge: 'Real-Time Pathfinding',
    description: 'Jetson Nano executes a lightweight generative policy model that adapts 6-DOF robot arm inverse kinematics in response to unexpected obstacles detected by ultrasonic and IMU sensors.',
    pipelineSteps: [
      'Ultrasonic/IMU sensors detect sudden dynamic obstacle in workcell workspace',
      'Nano runs lightweight path-adaptation network via TensorRT (sub-40ms latency)',
      'Output trajectory waypoints are serialized directly to OpenUSD /World/RobotArm xform attributes',
      'Hydra Storm renderer in USDView immediately reflects recalculated trajectory in real time'
    ],
    aiModel: 'TensorRT Quantized Policy Model (FP16)',
    usdSceneTarget: 'robot_workcell.usda',
    edgeLatencyTarget: '< 45ms per loop',
    samplePrompt: 'Obstacle detected at [X: 14.2cm, Y: -5.0cm]. Replan smooth trajectory avoiding collision.',
    simulatedOutput: {
      inferenceTimeMs: 38.4,
      usdStageParams: {
        '/World/RobotArm/Joint1_Yaw': '42.8 deg',
        '/World/RobotArm/Joint2_Pitch': '-18.5 deg',
        '/World/RobotArm/Joint3_Elbow': '64.2 deg',
        '/World/Obstacle/ColliderStatus': 'AVOIDED (Clearance: 4.8cm)',
        'SimulationLoopFPS': '28.5 FPS'
      },
      logMessage: 'Trajectory replanned in 38.4ms. USD Stage prim attributes updated with 0 dropped frames.'
    }
  },
  {
    id: 'smart-camera',
    title: 'Smart Camera Perception & Scene Augmentation',
    badge: 'Generative Vision',
    description: 'The CSI camera streams 1080p frames through an edge-quantized vision model on the Maxwell GPU, identifying objects and dynamically generating environmental lighting and materials in an augmented USD scene.',
    pipelineSteps: [
      'MIPI CSI-2 camera captures raw sensor frames with zero CPU copy overhead',
      'TensorRT vision engine generates semantic segmentation and condition embeddings',
      'Scene orchestrator updates OpenUSD scene lights, material reflectance, and object bounding bounds',
      'Augmented digital twin overlays synthetic metadata atop the live camera stream'
    ],
    aiModel: 'SD-Lite / Edge-Vision-Net (INT8 / FP16)',
    usdSceneTarget: 'smart_intersection.usda',
    edgeLatencyTarget: '< 120ms frame cycle',
    samplePrompt: 'Low-light industrial inspection frame received. Synthesize daylight exposure and highlight defect.',
    simulatedOutput: {
      inferenceTimeMs: 94.2,
      usdStageParams: {
        '/World/Lights/DomeLight/Intensity': '1450.0 lumen',
        '/World/InspectionPart/SurfaceDefectDetected': 'True (Score: 0.94)',
        '/World/Camera/ExposureCompensation': '+1.4 EV',
        'FrameThroughput': '11.2 FPS (Optimized)'
      },
      logMessage: 'Frame processed via TensorRT. OpenUSD DomeLight and shader parameters updated.'
    }
  },
  {
    id: 'digital-twin',
    title: 'Miniature Factory Floor Digital Twin',
    badge: 'Industrial Digital Twin',
    description: 'A physical miniature assembly line monitored by the Nano updates a complete OpenUSD digital twin stage in real time, synchronizing conveyor speed, machine vibrations, and anomaly predictions.',
    pipelineSteps: [
      'Telemetry collector ingests multi-sensor data (vibration, heat, optical speed)',
      'Lightweight generative anomaly prediction model evaluates equipment wear trends',
      'USD stage orchestrates conveyor animation speeds and alters machinery material health colors',
      'Engineers inspect the factory twin locally on USDView or sync stage to NVIDIA Omniverse'
    ],
    aiModel: 'TinyLlama / Anomaly Transformer (INT8)',
    usdSceneTarget: 'factory_floor_mini.usda',
    edgeLatencyTarget: '< 30ms telemetry sync',
    samplePrompt: 'Motor 3 telemetry reporting 12% vibration variance above nominal baseline.',
    simulatedOutput: {
      inferenceTimeMs: 27.6,
      usdStageParams: {
        '/World/Factory/ConveyorBelt_1/LinearVelocity': '0.45 m/s',
        '/World/Factory/Motor_3/HealthStatus': 'WARNING (Predicted MTBF: 42hrs)',
        '/World/Factory/Motor_3/ShaderColor': 'RGBA(0.95, 0.42, 0.1, 1.0)',
        'StageSyncJitter': '1.2ms'
      },
      logMessage: 'Digital twin telemetry synchronized. Predictive maintenance event logged to USD stage.'
    }
  }
];

export const PERFORMANCE_METRICS_LIST: PerformanceMetric[] = [
  {
    id: 'metric-latency',
    label: 'Inference Latency',
    metric: 'Model Response Time',
    unit: 'milliseconds (ms)',
    jetsonNanoTarget: '35 - 95 ms',
    cloudBaseline: '180 - 450 ms (incl. 80ms WAN RTT)',
    edgeAdvantage: 'Deterministic real-time control without network drops or upload bottlenecks.',
    importance: 'critical'
  },
  {
    id: 'metric-fps',
    label: 'Simulation Throughput',
    metric: 'Hydra Viewport Rendering',
    unit: 'Frames Per Second (FPS)',
    jetsonNanoTarget: '24 - 30+ FPS (10k prims)',
    cloudBaseline: '30 - 60 FPS (requires video streaming)',
    edgeAdvantage: 'Local HDMI display provides direct zero-latency visualization without video stream compression artifacts.',
    importance: 'critical'
  },
  {
    id: 'metric-power',
    label: 'Energy Efficiency',
    metric: 'System Power Consumption',
    unit: 'Watts (W)',
    jetsonNanoTarget: '5.0W - 10.0W TDP',
    cloudBaseline: '150W - 400W (Server GPU + Router)',
    edgeAdvantage: 'Over 20x to 40x lower energy draw; enables battery/solar operation for autonomous robotics.',
    importance: 'high'
  },
  {
    id: 'metric-interop',
    label: 'USD Interoperability',
    metric: 'Scene Exchange Fidelity',
    unit: 'Pixar OpenUSD Standard Compliance',
    jetsonNanoTarget: '100% compliant (.usda / .usdc)',
    cloudBaseline: '100% compliant',
    edgeAdvantage: 'Created stages export seamlessly to NVIDIA Omniverse, Blender, and Isaac Sim without re-authoring.',
    importance: 'high'
  }
];

export const PRESENTATION_SLIDES: SlideContent[] = [
  {
    id: 'slide-title',
    sectionNumber: 0,
    title: 'The Edge AI & Simulation Project',
    subtitle: 'Real-Time Generative AI Inference + OpenUSD Scene Simulation on NVIDIA Jetson Nano',
    bullets: [
      'Platform: NVIDIA Jetson Nano (128-core Maxwell GPU, 4GB LPDDR4)',
      'Mission: Deploy generative AI inference and 3D simulation on the edge without cloud reliance',
      'Synergy: Coupling TensorRT-accelerated models with Pixar OpenUSD dynamic scene orchestration',
      'Target Applications: Autonomous Robotics, Smart Vision, and Industrial Digital Twins'
    ],
    highlight: 'Dedicated edge AI hub operating at under 10 Watts total system power.',
    technicalDetails: [
      'Compute: 472 GFLOPs FP16 on 128 Maxwell CUDA cores',
      'Memory Architecture: Unified 4GB LPDDR4 memory space',
      'Software Core: JetPack 4.6, TensorRT 8.2, PyTorch 1.10/2.0, OpenUSD 22.08'
    ],
    speakerNotes: 'Welcome stakeholders. Today we present Project 2, demonstrating how cutting-edge generative AI models can be pruned and executed directly on an ultra-compact edge processor like the Jetson Nano to dynamically orchestrate physical 3D simulations using Pixar OpenUSD.'
  },
  {
    id: 'slide-objectives',
    sectionNumber: 1,
    title: '1. Project Objectives',
    subtitle: 'Strategic Goals & Edge Value Proposition',
    bullets: [
      'Establish Jetson Nano as a dedicated edge AI hub for generative inference and simulation.',
      'Demonstrate real-time performance of lightweight generative architectures (text-to-image, speech, small LLMs).',
      'Integrate OpenUSD scenes for robotics, AR/VR, and miniature digital twins.',
      'Highlight concrete edge deployment advantages: 100% offline capability, zero cloud round-trip delay, strict telemetry privacy, and sub-10W power.'
    ],
    highlight: 'Zero reliance on cloud APIs eliminates latency jitter and external recurring costs.',
    technicalDetails: [
      'Offline Resilience: Continued operation in remote industrial zones, tunnels, and mobile robots.',
      'Privacy: Camera telemetry and internal proprietary geometry never leave local flash storage.'
    ],
    speakerNotes: 'Our objectives tackle the central limitation of modern generative AI: its heavy reliance on multi-kilowatt cloud clusters. We bring these capabilities directly to the edge.'
  },
  {
    id: 'slide-hardware',
    sectionNumber: 2,
    title: '2. Hardware Setup',
    subtitle: 'Embedded Compute & Sensor Array Integration',
    bullets: [
      'NVIDIA Jetson Nano Developer Kit: Quad-core ARM Cortex-A57 CPU @ 1.43 GHz + 128-core Maxwell GPU.',
      'Memory: 4GB 64-bit LPDDR4 unified memory (25.6 GB/s bandwidth).',
      'Vision Ingestion: Sony IMX219 8MP CSI-2 camera module (low CPU load via hardware ISP).',
      'Robotics Peripherals: MPU-6050 6-DOF IMU, Ultrasonic HC-SR04, and active IR sensor arrays.',
      'Display & Power: HDMI 2.0 viewport monitor, 5V/4A DC barrel power supply (10W mode enabled).'
    ],
    highlight: 'Hardware ISP on Tegra handles camera debayering without consuming GPU compute.',
    technicalDetails: [
      'Power: 5V/4A DC supply prevents GPU throttling under peak matrix multiplication load.',
      'Storage: 128GB UHS-I SD/SSD with configured ZRAM swap file for safety headroom.'
    ],
    speakerNotes: 'The hardware configuration maximizes the Jetson Nano B01 carrier board. By utilizing the 5V/4A barrel jack with the J48 jumper, we unlock the full 10W performance mode without risk of brownouts.'
  },
  {
    id: 'slide-software',
    sectionNumber: 3,
    title: '3. Software Stack',
    subtitle: 'Inference Engines, OpenUSD Runtime & Containerization',
    bullets: [
      'AI Inference: PyTorch for model definition, compiled into optimized TensorRT FP16/INT8 execution engines.',
      'Generative Model Portfolio: Stable Diffusion Lite (LCM-LoRA), Whisper small speech recognition, GPT2-mini / TinyLlama 1.1B.',
      'Simulation Engine: Pixar OpenUSD core with Python bindings (pxr library) for programmatic scene composition.',
      'Rendering Viewport: USDView utilizing Hydra Storm rasterizer over local OpenGL context.',
      'System Architecture: NVIDIA JetPack SDK (L4T), CUDA 10.2, and reproducible Docker containers.'
    ],
    highlight: 'TensorRT delivers up to 4x acceleration over raw PyTorch on the Maxwell architecture.',
    technicalDetails: [
      'Unified Memory: Zero-copy buffers prevent CPU-to-GPU data transfers.',
      'OpenUSD: Dynamic stage composition enables hot updates to geometry without re-parsing files.'
    ],
    speakerNotes: 'On the software side, TensorRT is our engine for acceleration. We calibrate models to half-precision FP16, fitting generative parameters into the 4GB unified memory while OpenUSD handles spatial representations.'
  },
  {
    id: 'slide-methodology',
    sectionNumber: 4,
    title: '4. Methodology & Implementation Plan',
    subtitle: 'Three-Stage Pipeline from Model Quantization to Physical Demos',
    bullets: [
      'Phase 1: Model Optimization — Prune layers, quantize to FP16/INT8, profile memory footprint to < 2.2GB.',
      'Phase 2: USD Scene Integration — Author parametric .usda scenes and establish Python pxr attribute binding loops.',
      'Phase 3: Core Demo Tracks: Robotics simulation (real-time pathfinding), Smart camera perception (generative enhancement), Digital twin (factory floor state sync).'
    ],
    highlight: 'Continuous benchmark loop monitors latency, FPS, and thermal headroom at each stage.',
    technicalDetails: [
      'Dynamic Attribute Bridge: Sensor updates propagate to USD prim properties within < 30ms.',
      'Thermal Management: PWM fan control maintains Maxwell core under 65°C.'
    ],
    speakerNotes: 'Our methodology follows an empirical engineering workflow: we first quantize models, then build lightweight USD primitives, and finally link the two in our three featured demonstration tracks.'
  },
  {
    id: 'slide-metrics',
    sectionNumber: 5,
    title: '5. Performance Metrics & Benchmarks',
    subtitle: 'Target Quantitative Thresholds vs. Cloud Baselines',
    bullets: [
      'Inference Latency: Target < 45ms for robotics control and < 120ms for vision processing.',
      'Simulation Throughput: Maintain 24–30+ FPS for interactive USDView viewport playback.',
      'Energy Efficiency: Peak power consumption capped at 9.5W (over 20x less than cloud server equivalents).',
      'Interoperability: 100% compliant OpenUSD asset trees ready for NVIDIA Omniverse import.'
    ],
    highlight: 'Direct edge inference eliminates 50-150ms of network travel time and jitter.',
    technicalDetails: [
      'Deterministic Timing: Hard guarantees on loop frequency for robotics safety.',
      'Cost: Zero recurrent cloud API pricing or bandwidth ingress/egress fees.'
    ],
    speakerNotes: 'We measure success across latency, throughput, energy, and interoperability. The edge architecture wins decisively on latency determinism and compute-per-watt.'
  },
  {
    id: 'slide-future',
    sectionNumber: 6,
    title: '6. Future Extensions & Scaling Roadmap',
    subtitle: 'Migration to Next-Gen Silicon and Enterprise Robotics',
    bullets: [
      'Silicon Scaling: Seamless transition to Jetson Xavier NX (21 TOPS) or Jetson Orin Nano/AGX (40–275 TOPS).',
      'Hybrid Cloud-Edge Architecture: Partition workload—nano handles real-time safety, cloud handles foundational reasoning.',
      'ROS 2 Ecosystem: Direct bridge into ROS 2 Humble nodes via ros2_usd / micro-ROS interfaces.',
      'Multi-Device Orchestration: Distributed Jetson nodes collaborating on a synchronized live OpenUSD stage.'
    ],
    highlight: 'Architecture is forward-compatible with the entire NVIDIA Jetson ecosystem.',
    technicalDetails: [
      'Orin Upgrade: Unlocks full INT4/FP8 quantization and Transformer Engine hardware acceleration.',
      'ROS 2: Enables integration with industrial robot manipulators and autonomous mobile robots (AMRs).'
    ],
    speakerNotes: 'While our prototype targets the cost-effective Jetson Nano, every software layer—TensorRT and OpenUSD—is natively forward-compatible with modern Jetson Orin modules.'
  },
  {
    id: 'slide-outcomes',
    sectionNumber: 7,
    title: '7. Expected Outcomes & Deliverables',
    subtitle: 'Tangible Artifacts and Portfolio Milestones',
    bullets: [
      'Turnkey Prototype: Verified hardware-software system running generative AI and OpenUSD on Jetson Nano.',
      'Empirical Benchmark Suite: Publishable performance dataset measuring latency, FPS, and power profiles.',
      'Portfolio-Ready Open Source Assets: Documented GitHub repository, Docker recipes, and OpenUSD sample stages.',
      'Field-Tested Showcase: 3 interactive demos ready for academic, executive, or client presentations.'
    ],
    highlight: 'Delivers a validated, reproducible blueprint for edge generative simulation.',
    technicalDetails: [
      'Artifact 1: Dockerized JetPack 4.6 environment with pre-built PyTorch and pxr binaries.',
      'Artifact 2: Complete whitepaper with thermal and power logging data.'
    ],
    speakerNotes: 'In conclusion, this project delivers not just a theoretical concept, but an operational, benchmarked, portfolio-grade demonstration of Edge AI and OpenUSD working in harmony on NVIDIA silicon.'
  }
];
