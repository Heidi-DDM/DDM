
import React, { useState } from 'react';
import { BATTERY_DETAILS } from '../../constants';
import { ChevronLeft, Battery, AlertTriangle, FileText, CheckCircle, Circle, ArrowRight, ShieldCheck, Activity, Info, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BatteryGrade, SafetyStatus, BatteryFactor } from '../../types';

interface BatteryViewProps {
  onBack: () => void;
}

const COLORS = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759'];

const BatteryView: React.FC<BatteryViewProps> = ({ onBack }) => {
  const { vin, type, score, factors, improvementPlan, systemRating, systemSuggestion, healthMetrics, safetyMetrics } = BATTERY_DETAILS;
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<BatteryFactor | null>(null);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case BatteryGrade.Excellent: return 'bg-green-100 text-green-700';
      case BatteryGrade.Good: return 'bg-blue-100 text-blue-700';
      case BatteryGrade.Fair: return 'bg-yellow-100 text-yellow-700';
      case BatteryGrade.Poor: return 'bg-red-100 text-red-700';
      case SafetyStatus.Normal: return 'bg-green-100 text-green-700';
      case SafetyStatus.Minor: return 'bg-orange-100 text-orange-700';
      case SafetyStatus.Abnormal: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (showTechnicalDetails) {
    return (
      <div className="min-h-screen bg-ios-bg pb-20 animate-in slide-in-from-right duration-300">
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setShowTechnicalDetails(false)} className="p-2 -ml-2 text-ios-blue flex items-center">
            <ChevronLeft size={24} />
            <span className="font-medium text-lg">Back</span>
          </button>
          <h1 className="font-bold text-lg text-black">Technical Analysis</h1>
          <div className="w-8"></div>
        </header>

        <div className="p-4 space-y-6">
          {/* Health Analysis */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center mb-4 text-ios-blue">
               <Activity size={20} className="mr-2" />
               <h3 className="font-bold text-lg">Health Indicators</h3>
            </div>
            <div className="space-y-3">
               {healthMetrics.map((metric, idx) => (
                 <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700 font-medium">{metric.label}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getGradeColor(metric.grade)}`}>
                       {metric.grade}
                    </span>
                 </div>
               ))}
            </div>
          </div>

          {/* Safety Evaluation */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center mb-4 text-ios-green">
               <ShieldCheck size={20} className="mr-2" />
               <h3 className="font-bold text-lg">Safety Systems</h3>
            </div>
            <div className="space-y-3">
               {safetyMetrics.map((metric, idx) => (
                 <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700 font-medium">{metric.label}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getGradeColor(metric.grade)}`}>
                       {metric.grade}
                    </span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ios-bg pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-ios-blue flex items-center">
          <ChevronLeft size={24} />
          <span className="font-medium text-lg">Home</span>
        </button>
        <h1 className="font-bold text-lg text-black absolute left-1/2 transform -translate-x-1/2">Battery Monitor</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center text-xs text-gray-500">
           <div>
             <span className="block uppercase tracking-wider mb-1">Vehicle VIN</span>
             <span className="font-mono text-gray-900 font-bold">{vin}</span>
           </div>
           <div className="text-right">
             <span className="block uppercase tracking-wider mb-1">Battery Type</span>
             <span className="text-gray-900 font-bold">{type}</span>
           </div>
        </div>

        {/* Improved System Evaluation Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Battery size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center py-4">
               <h2 className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Overall System Rating</h2>
               <div className="flex items-baseline space-x-3">
                  <span className="text-7xl font-bold tracking-tighter">{score}</span>
                  <span className="text-2xl font-semibold opacity-90">{systemRating}</span>
               </div>
               <div className="mt-2 text-xs font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                 Health Score
               </div>
            </div>
            
            <p className="relative z-10 mt-4 text-sm font-medium leading-relaxed bg-black/10 p-4 rounded-xl backdrop-blur-sm border border-white/5 text-center">
               {systemSuggestion}
            </p>

            <div className="relative z-10 mt-6 flex justify-center">
               <button 
                  onClick={() => setShowTechnicalDetails(true)}
                  className="bg-white text-emerald-800 px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center"
                >
                  View Technical Analysis <ArrowRight size={16} className="ml-2" />
               </button>
            </div>
        </div>

        {/* Damage Attribution Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
               Damage Attribution
               <Info size={14} className="ml-2 text-gray-400" />
            </h3>
            
            <div className="flex items-center">
                <div className="h-40 w-1/2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie
                      data={factors}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={55}
                      paddingAngle={4}
                      dataKey="percentage"
                      >
                      {factors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      </Pie>
                  </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-xs font-bold text-gray-400">Factors</span>
                  </div>
                </div>
                
                <div className="w-1/2 space-y-3">
                    {factors.map((f, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedFactor(f)}
                          className="flex items-center justify-between group cursor-pointer active:opacity-60"
                        >
                            <div className="flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full mr-2 flex-shrink-0" style={{backgroundColor: COLORS[i]}}></span>
                                <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">{f.name}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-900">{f.percentage}%</span>
                        </div>
                    ))}
                    <p className="text-[10px] text-gray-400 text-center mt-2">Tap item for details</p>
                </div>
            </div>
        </div>

        {/* Habit Improvement Plan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-l-ios-blue">
           <div className="flex justify-between items-center mb-5">
              <div className="flex items-center">
                 <FileText size={20} className="text-ios-blue mr-2" />
                 <h3 className="font-bold text-gray-900 text-lg">Habit Improvement Plan</h3>
              </div>
           </div>
           
           <div className="space-y-4">
              {improvementPlan.map((item, idx) => (
                 <div key={idx} className="bg-gray-50 rounded-xl p-4 relative">
                    <div className="absolute left-4 top-4 w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="pl-6 border-l border-gray-200 ml-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Bad Habit</p>
                      <p className="text-sm font-semibold text-gray-800 mb-3">{item.habit}</p>
                      
                      <div className="flex items-center text-ios-blue bg-blue-50 w-fit px-3 py-1.5 rounded-lg">
                        <ArrowRight size={14} className="mr-2" />
                        <div>
                           <p className="text-[10px] text-blue-600 uppercase font-bold">New Goal</p>
                           <p className="text-sm font-bold">{item.action}</p>
                        </div>
                      </div>
                    </div>
                 </div>
              ))}
           </div>
           
           <button className="w-full mt-5 bg-black text-white py-3 rounded-xl text-sm font-semibold shadow-md active:scale-95 transition-transform flex items-center justify-center">
              Commit to Plan
           </button>
        </div>

      </div>

      {/* Factor Detail Modal */}
      {selectedFactor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
              <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-start">
                 <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${
                      selectedFactor.level === 'Severe' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {selectedFactor.level} Impact
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{selectedFactor.name}</h3>
                 </div>
                 <button onClick={() => setSelectedFactor(null)} className="p-1 bg-white rounded-full text-gray-500 hover:bg-gray-200 shadow-sm">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-5 space-y-4">
                 <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Why it hurts</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                       {selectedFactor.description}
                    </p>
                 </div>
                 
                 <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1 flex items-center">
                       <CheckCircle size={12} className="mr-1" /> Recommendation
                    </h4>
                    <p className="text-sm font-medium text-green-900 leading-relaxed">
                       {selectedFactor.optimization}
                    </p>
                 </div>
              </div>
              
              <div className="p-4 border-t border-gray-100">
                 <button 
                   onClick={() => setSelectedFactor(null)}
                   className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm"
                 >
                    Got it
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default BatteryView;
