
import { RiskItem, RiskLevel, Suggestion, UserProfile, DrivingStats, BatteryStats, TrainingVideo, TrainingCourse, DailyStats, DrivingHistoryItem, BatteryGrade, SafetyStatus, EnvironmentDetails, InsuranceDetails } from './types';

export const USER_DATA: UserProfile = {
  name: "Alex",
  vehicleModel: "Tesla Model Y",
  totalScore: 78,
  discountRate: 15,
  safetyStreak: 12, // Days
};

export const RISK_DATA: RiskItem[] = [
  {
    id: 'behavior',
    category: 'Behavior',
    title: 'Driving Behavior',
    score: 72,
    level: RiskLevel.Medium,
    details: [
      { label: 'Rapid Accel', value: '12 times', isWarning: true },
      { label: 'Lane Changes', value: 'Normal' },
      { label: 'Avg Speed', value: '45 km/h' },
    ],
    deductions: [
      { reason: 'Sudden Braking', points: -5 },
      { reason: 'Rapid Acceleration', points: -3 },
    ]
  },
  {
    id: 'battery',
    category: 'Battery',
    title: 'Battery Health',
    score: 92,
    level: RiskLevel.Low,
    details: [
      { label: 'Voltage', value: 'Stable' },
      { label: 'SOC', value: '68%' },
      { label: 'Temp', value: 'Optimal' },
    ],
    deductions: []
  },
  {
    id: 'env',
    category: 'Environment',
    title: 'Environment',
    score: 65,
    level: RiskLevel.Medium,
    details: [
      { label: 'Weather', value: 'Heavy Rain', isWarning: true },
      { label: 'Road Risk', value: 'High' },
    ],
    deductions: [
      { reason: 'High Speed in Rain', points: -10 },
    ]
  }
];

export const SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    title: 'Reduce Rapid Acceleration',
    description: 'Frequent rapid starts degrade battery life and lower safety score.',
    type: 'Critical'
  },
  {
    id: '2',
    title: 'Wet Road Caution',
    description: 'Rain detected. Increase following distance to maintain safety score.',
    type: 'Optimization'
  },
  {
    id: '3',
    title: 'Charging Habits',
    description: 'Avoid fast charging above 90% to improve battery longevity score.',
    type: 'Optimization'
  }
];

// --- Mock Data Generation ---

const generateDrivingData = (): DrivingStats => {
  const history: DrivingHistoryItem[] = [];
  const dailyData: Record<string, DailyStats> = {};
  const today = new Date();

  // Generate 30 days
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : `${d.getDate()}/${d.getMonth() + 1}`;
    
    // Randomize score mostly between 60 and 90
    const score = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
    
    history.push({
      day: dayLabel,
      date: dateStr,
      score: score
    });

    // Generate random events for this day
    const numEvents = Math.floor(Math.random() * 4); // 0 to 3 events per day
    const dayEvents = [];
    const eventTypes = ['Sudden Braking', 'Rapid Acceleration', 'Speeding', 'Sharp Turn'];
    const locations = ['Main St', 'Highway 101', 'School Zone', 'Downtown', 'Residential Area'];

    for (let j = 0; j < numEvents; j++) {
      dayEvents.push({
        id: `${dateStr}-${j}`,
        time: `${Math.floor(Math.random()*12)+8}:${Math.floor(Math.random()*60).toString().padStart(2, '0')} AM`,
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        riskLevel: Math.random() > 0.6 ? RiskLevel.High : RiskLevel.Medium,
      });
    }

    dailyData[dateStr] = {
      date: dateStr,
      score: score,
      mileage: `${Math.floor(Math.random() * 50 + 10)} km`,
      duration: `${Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 50)}m`,
      avgSpeed: `${Math.floor(Math.random() * 40 + 20)} km/h`,
      energy: `${Math.floor(Math.random() * 30 + 130)} Wh/km`,
      events: dayEvents
    };
  }

  return {
    score: 72, // 30-day avg
    mileage: "1,240 km",
    duration: "32h 15m",
    avgSpeed: "44 km/h",
    energy: "148 Wh/km",
    history,
    dailyData
  };
};

export const DRIVING_DETAILS: DrivingStats = generateDrivingData();

export const BATTERY_DETAILS: BatteryStats = {
  vin: "LRW3E7EL2NC***",
  type: "LFP (Lithium Iron Phosphate)",
  score: 92,
  systemRating: BatteryGrade.Excellent,
  systemSuggestion: "Your battery system is in excellent condition. Continuing your current healthy charging habits will effectively extend the vehicle's lifespan.",
  factors: [
    { 
      name: "High Temp Fast Charging", 
      percentage: 41, 
      level: 'Severe',
      description: "Fast charging when the battery temp is >45°C accelerates the thickening of the SEI layer and may cause Lithium Plating, permanently reducing capacity.",
      optimization: "Allow battery to cool down for 15 mins after highway driving before plugging into a Supercharger."
    },
    { 
      name: "Rapid Acceleration", 
      percentage: 23, 
      level: 'Moderate',
      description: "Sudden high-current discharge creates internal heat stress and mechanical stress on electrode materials.",
      optimization: "Use 'Chill Mode' for daily commuting to limit peak discharge currents."
    },
    { 
      name: "Deep Discharge (<10%)", 
      percentage: 19, 
      level: 'Moderate',
      description: "Leaving the battery at very low SOC causes voltage stress that can degrade the cathode material.",
      optimization: "Try to recharge before the battery drops below 20%."
    },
    { 
      name: "Frequent Fast Charging", 
      percentage: 10, 
      level: 'Mild',
      description: "Exclusively using DC fast charging can slightly increase internal resistance over time compared to AC charging.",
      optimization: "Mix in AC slow charging (home/work) at least once a week to balance cells."
    },
  ],
  improvementPlan: [
    { 
      habit: "Frequent Fast Charging in Afternoon Heat", 
      action: "Shift fast charging to mornings or evenings",
      target: "Avoid 12pm-4pm"
    },
    { 
      habit: "Aggressive Starts at Traffic Lights", 
      action: "Enable Chill Mode in city traffic",
      target: "Avg Accel < 3 m/s²"
    },
    { 
      habit: "Draining to 5% before plugging in", 
      action: "Plug in sooner",
      target: "Charge at 20%"
    },
  ],
  healthMetrics: [
    { label: "Battery State of Health (SOH)", grade: BatteryGrade.Excellent },
    { label: "Capacity Consistency", grade: BatteryGrade.Excellent },
    { label: "Internal Resistance Consistency", grade: BatteryGrade.Good },
    { label: "SOC Consistency", grade: BatteryGrade.Good },
    { label: "Voltage Consistency", grade: BatteryGrade.Excellent },
    { label: "Capacity Fade Rate", grade: BatteryGrade.Excellent },
    { label: "Max Capacity Abnormal Shrinkage", grade: BatteryGrade.Good },
  ],
  safetyMetrics: [
    { label: "Short Circuit Fault", grade: SafetyStatus.Normal },
    { label: "Lithium Plating Exception", grade: SafetyStatus.Normal },
    { label: "Battery Aging Exception", grade: SafetyStatus.Normal },
    { label: "Consistency Exception", grade: SafetyStatus.Minor },
    { label: "Insulation Exception", grade: SafetyStatus.Normal },
    { label: "Temperature Exception", grade: SafetyStatus.Normal },
    { label: "Cell Voltage Anomaly", grade: SafetyStatus.Normal },
    { label: "Sampling Exception", grade: SafetyStatus.Normal },
  ]
};

export const ENVIRONMENT_DETAILS: EnvironmentDetails = {
  weather: {
    condition: "Heavy Rain",
    temp: "24°C",
    visibility: "Low (200m)",
    roadFriction: "0.5 (Slippery)"
  },
  alerts: [
    { id: '1', type: 'Weather', severity: 'High', message: 'Heavy Rain Warning: High risk of hydroplaning.' },
    { id: '2', type: 'Accident', severity: 'Medium', message: 'Accident reported 2km ahead on Nathan Road.' },
    { id: '3', type: 'Traffic', severity: 'Info', message: 'Police Speed Check detected in 500m.' }
  ],
  routes: [
    {
      id: 'opt1',
      name: 'Flat Highway Route',
      tag: 'Energy Saver',
      duration: '52 min',
      distance: '35 km',
      energyConsumption: '4.8 kWh',
      savings: 'Saves 1.2 kWh',
      rangeEquivalent: '≈ 8 km range',
      features: ['Flat Gradient', 'Fewer Stops', 'Avoids Traffic']
    },
    {
      id: 'opt2',
      name: 'City Short-cut',
      tag: 'Efficiency',
      duration: '45 min',
      distance: '32 km',
      energyConsumption: '6.0 kWh',
      features: ['Fastest Time', 'More Traffic Lights', 'Aggressive Merges']
    }
  ]
};

export const INSURANCE_DETAILS: InsuranceDetails = {
  policy: {
    policyNumber: "AXA-HK-2025-8832",
    provider: "AXA Insurance",
    renewalDate: "2026-01-15",
    basePremium: 12000,
  },
  projectedAnnualSavings: 4200,
  currentDiscount: 15,
  savingsHistory: [
    { month: 'Aug', savedAmount: 180 },
    { month: 'Sep', savedAmount: 240 },
    { month: 'Oct', savedAmount: 320 },
    { month: 'Nov', savedAmount: 290 },
    { month: 'Dec', savedAmount: 350 },
  ]
};

export const TRAINING_VIDEOS: TrainingVideo[] = [
  { id: '1', title: 'Smooth Braking Techniques', duration: '3:45', thumbnailColor: 'bg-blue-100' },
  { id: '2', title: 'Anticipating Traffic Flow', duration: '5:12', thumbnailColor: 'bg-indigo-100' },
  { id: '3', title: 'Battery Saving Driving', duration: '4:20', thumbnailColor: 'bg-green-100' },
];

export const TRAINING_COURSE: TrainingCourse = {
  id: 'c1',
  title: 'Advanced EV Control 1-on-1',
  description: 'A 2-hour session with a professional instructor to correct sudden braking habits and optimize energy usage.',
  location: 'HK Driving Academy, Shatin',
  date: 'Next Available: Dec 12',
  price: '$800 HKD'
};

export const SYSTEM_INSTRUCTION = `
You are the AI Assistant for the DDM (Driving Risk Management) System. 
Your goal is to help the user understand their driving score, insurance discounts, and safety risks.
The user drives a Tesla Model Y.
Their current score is 78/100.
Major issues: Sudden braking, rapid acceleration, and driving fast in the rain.
Battery health is good.
Keep answers concise, helpful, and encouraging. Focus on safety and money saving.
`;
