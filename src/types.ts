export type ToolCategory =
  | 'All'
  | 'Development'
  | 'UI/UX Design'
  | 'Content & Copy'
  | 'Video & Audio'
  | 'Productivity & Automation'
  | 'Data & AI Models';

export type PricingModel = '100% Free' | 'Freemium' | 'Paid';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  subCategory?: string;
  description: string;
  useCases: string[];
  pricing: PricingModel;
  limitations: string;
  skillLevel: SkillLevel;
  rating: number;
  popularity: number; // 1-100 score
  reviewsCount?: string;
  hiddenGem: boolean;
  noCreditCard: boolean;
  link: string;
  roadmapSteps: string[];
  tags: string[];
  iconBg: string;
  initials: string;
  badge?: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  recommendedToolIds: string[];
  freeAlternativeIds: string[];
  deliverables: string[];
}

export interface ProjectRoadmap {
  id: string;
  title: string;
  category: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: RoadmapStep[];
}

export interface FreeStackTier {
  role: string;
  toolId: string;
  tier: '100% Free' | 'Free Plan' | 'Free with Limits' | 'Paid';
  explanation: string;
  limitationNote?: string;
}

export interface FreeStackPreset {
  id: string;
  title: string;
  icon: string;
  description: string;
  targetAudience: string;
  tiers: FreeStackTier[];
  monthlyCostEstimate: string;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  primaryRole?: string;
  skillLevel?: SkillLevel;
  preferredStack?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  createdAt?: string;
  updatedAt?: string;
  preferences?: UserPreferences;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedToolIds?: string[];
}
