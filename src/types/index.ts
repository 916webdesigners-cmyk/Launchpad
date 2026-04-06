export type QuestionnaireAnswers = {
  // Step 1 - Vision
  projectDescription: string;
  websiteType: string;
  skillLevel: string;

  // Step 2 - Stack
  designTools: string[];
  buildTools: string[];
  hostingTools: string[];
  otherStack: string;

  // Step 3 - Features
  features: string[];
  otherFeatures: string;

  // Step 4 - Timeline
  timeline: string;
  teamSize: string;
  projectType: string;
  budget: string;

  // Step 5 - Preferences
  stripeIntegration: string;
  backendNeeded: string;
  aiAssisted: string;
  additionalNotes: string;
};

export type WorkflowPhase = {
  phaseNumber: number;
  phaseName: string;
  description: string;
  estimatedTime: string;
  steps: string[];
  tools: string[];
};

export type SkillFile = {
  fileName: string;
  fileContent: string;
  description: string;
};

export type GeneratedWorkflow = {
  projectSummary: string;
  phases: WorkflowPhase[];
  skillFiles: SkillFile[];
  stripeGuide: string | null;
  recommendedStack: string[];
  warnings: string[];
};
