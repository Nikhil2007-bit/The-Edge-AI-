export type ViewMode = 'document' | 'presentation' | 'working-guide';

export interface ProposalSection {
  id: string;
  number: number;
  title: string;
  icon: string;
  summary: string;
  content: string[];
  subsections?: {
    title: string;
    items: string[];
    codeSnippet?: string;
    details?: string;
  }[];
  tags: string[];
}

export interface HardwareItem {
  id: string;
  name: string;
  category: 'core' | 'peripherals' | 'power_storage' | 'optional';
  specification: string;
  status: 'procured' | 'testing' | 'ready' | 'pending';
  notes: string;
  interfaceType: string;
}

export interface SoftwareComponent {
  name: string;
  category: 'inference' | 'simulation' | 'system';
  version: string;
  role: string;
  commandSnippet?: string;
  docsUrl?: string;
}

export interface DemoTrack {
  id: 'robotics' | 'smart-camera' | 'digital-twin';
  title: string;
  badge: string;
  description: string;
  pipelineSteps: string[];
  aiModel: string;
  usdSceneTarget: string;
  edgeLatencyTarget: string;
  samplePrompt: string;
  simulatedOutput: {
    inferenceTimeMs: number;
    usdStageParams: Record<string, string | number>;
    logMessage: string;
  };
}

export interface PerformanceMetric {
  id: string;
  label: string;
  metric: string;
  unit: string;
  jetsonNanoTarget: string;
  cloudBaseline: string;
  edgeAdvantage: string;
  importance: 'critical' | 'high' | 'medium';
}

export interface SlideContent {
  id: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  bullets: string[];
  highlight: string;
  technicalDetails: string[];
  speakerNotes: string;
}
