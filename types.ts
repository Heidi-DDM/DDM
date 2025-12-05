
export enum RiskLevel {
  Low = 'Low',       // Green
  Medium = 'Medium', // Yellow/Orange
  High = 'High',     // Red
}

export type ViewState = 'home' | 'Behavior' | 'Battery' | 'Environment' | 'Training' | 'Insurance';

export interface RiskItem {
  id: string;
  category: 'Behavior' | 'Battery' | 'Environment';
  title: string;
  score: number; // 0-100
  level: RiskLevel;
  details: {
    label: string;
    value: string;
    isWarning?: boolean;
  }[];
  deductions: {
    reason: string;
    points: number;
  }[];
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'Critical' | 'Optimization';
}

export interface UserProfile {
  name: string;
  vehicleModel: string; // e.g., Tesla Model Y
  totalScore: number;
  discountRate: number;
  safetyStreak: number; // Days of safe driving
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: any; // Lucide icon component
  action: () => void;
}

// --- Specific Subsystem Types ---

export interface DrivingEvent {
  id: string;
  time: string;
  type: string;
  location: string;
  riskLevel: RiskLevel;
}

export interface DrivingHistoryItem {
  day: string;
  date: string; // ISO date string for matching
  score: number;
}

export interface DailyStats {
  date: string;
  score: number;
  mileage: string;
  duration: string;
  avgSpeed: string;
  energy: string;
  events: DrivingEvent[];
}

export interface DrivingStats {
  score: number; // 30-day avg
  mileage: string; // 30-day total
  duration: string; // 30-day total
  avgSpeed: string; // 30-day avg
  energy: string; // 30-day avg
  history: DrivingHistoryItem[]; // 30 days trend data
  dailyData: Record<string, DailyStats>; // Keyed by date string
}

export enum BatteryGrade {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor',
}

export enum SafetyStatus {
  Normal = 'Normal',
  Minor = 'Minor Abnormal',
  Abnormal = 'Abnormal',
}

export interface BatteryMetric {
  label: string;
  grade: BatteryGrade | SafetyStatus;
}

export interface BatteryFactor {
  name: string;
  percentage: number; // Contribution to damage
  level: 'Severe' | 'Moderate' | 'Mild';
  description: string; // Scientific explanation of harm
  optimization: string; // Specific behavioral advice
}

export interface ImprovementAction {
  habit: string;
  action: string;
  target: string;
}

export interface BatteryStats {
  vin: string;
  type: string;
  score: number;
  systemRating: BatteryGrade;
  systemSuggestion: string;
  factors: BatteryFactor[];
  improvementPlan: ImprovementAction[];
  healthMetrics: BatteryMetric[];
  safetyMetrics: BatteryMetric[];
}

// --- Environment Types ---

export interface EnvironmentalAlert {
  id: string;
  type: 'Weather' | 'Traffic' | 'Accident';
  message: string;
  severity: 'High' | 'Medium' | 'Info';
  location?: string;
}

export interface RouteOption {
  id: string;
  name: string;
  tag: 'Efficiency' | 'Energy Saver';
  duration: string;
  distance: string;
  energyConsumption: string; // kWh
  savings?: string; // e.g., "Saves 3kWh"
  rangeEquivalent?: string; // e.g., "≈ 20km range"
  features: string[]; // e.g., "Flat Road", "No Traffic Lights"
}

export interface EnvironmentDetails {
  weather: {
    condition: string;
    temp: string;
    visibility: string;
    roadFriction: string; // e.g., "0.7 (Wet)"
  };
  alerts: EnvironmentalAlert[];
  routes: RouteOption[];
}

// --- Training Types ---

export interface TrainingVideo {
  id: string;
  title: string;
  duration: string;
  thumbnailColor: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  price: string;
}

// --- Insurance Types ---

export interface PolicyInfo {
  policyNumber: string;
  provider: string;
  renewalDate: string;
  basePremium: number;
}

export interface InsuranceSavings {
  month: string;
  savedAmount: number;
}

export interface InsuranceDetails {
  policy: PolicyInfo;
  projectedAnnualSavings: number;
  currentDiscount: number;
  savingsHistory: InsuranceSavings[];
}
