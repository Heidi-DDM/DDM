
import React, { useState } from 'react';
import { RISK_DATA } from '../constants';
import { RiskItem, RiskLevel, ViewState } from '../types';
import { Activity, Battery, CloudRain, ArrowRight, AlertTriangle, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Mapping icons to categories
const IconMap: Record<string, any> = {
  Behavior: Activity,
  Battery: Battery,
  Environment: CloudRain,
};

const ColorMap = {
  [RiskLevel.Low]: 'bg-ios-green',
  [RiskLevel.Medium]: 'bg-ios-orange',
  [RiskLevel.High]: 'bg-ios-red',
};

const TextColorMap = {
  [RiskLevel.Low]: 'text-ios-green',
  [RiskLevel.Medium]: 'text-ios-orange',
  [RiskLevel.High]: 'text-ios-red',
};

interface RiskCardsProps {
  onNavigate: (view: ViewState) => void;
}

export const RiskCards: React.FC<RiskCardsProps> = ({ onNavigate }) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);

  const openModal = (item: RiskItem) => setSelectedRisk(item);
  const closeModal = () => setSelectedRisk(null);

  const handleDetailsClick = () => {
    if (selectedRisk) {
      onNavigate(selectedRisk.category);
      closeModal();
    }
  };

  return (
    <div className="px-6 py-2">
      <div className="flex items-center justify-between mb-4">
         <h2 className="text-lg font-bold text-gray-900">Risk Analysis</h2>
         <span className="text-xs font-medium text-gray-400">3 Modules Active</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {RISK_DATA.map((item, index) => {
          const Icon = IconMap[item.category];
          const colorClass = TextColorMap[item.level];
          const isPrimary = index === 0; // First item is Hero

          return (
            <div 
              key={item.id}
              onClick={() => openModal(item)}
              className={`
                relative rounded-2xl p-5 shadow-sm border border-gray-100 active:scale-[0.98] transition-all cursor-pointer overflow-hidden
                ${isPrimary ? 'col-span-2 bg-gradient-to-br from-white to-blue-50/30' : 'col-span-1 bg-white'}
              `}
            >
              {/* Decorative Background for Primary */}
              {isPrimary && (
                 <div className="absolute top-0 right-0 p-4 opacity-[0.03] transform translate-x-4 -translate-y-2">
                    <Icon size={120} />
                 </div>
              )}

              <div className={`flex ${isPrimary ? 'items-center justify-between' : 'flex-col items-start'}`}>
                
                {/* Icon & Title Group */}
                <div className={`flex ${isPrimary ? 'items-center space-x-4' : 'flex-col items-start'}`}>
                   <div className={`p-3 rounded-full ${isPrimary ? 'bg-white shadow-sm' : 'bg-gray-50 mb-3'} ${colorClass}`}>
                     <Icon size={isPrimary ? 24 : 20} />
                   </div>
                   <div>
                      <h3 className={`font-bold text-gray-900 ${isPrimary ? 'text-lg' : 'text-sm'}`}>{item.title}</h3>
                      {isPrimary && (
                         <p className="text-xs text-gray-500 mt-0.5">
                            {item.details.length > 0 ? item.details[0].label : 'Status OK'}
                         </p>
                      )}
                   </div>
                </div>

                {/* Score & Secondary Info */}
                <div className={`${isPrimary ? 'text-right' : 'mt-2 w-full'}`}>
                   <div className="flex items-center justify-end sm:justify-between">
                      <span className={`font-bold ${isPrimary ? 'text-3xl' : 'text-xl'} ${colorClass}`}>
                        {item.score}
                      </span>
                      {/* Trend indicator placeholder */}
                      {isPrimary && <TrendingUp size={16} className="text-gray-400 ml-2 mb-1" />}
                   </div>
                   {!isPrimary && (
                      <p className="text-xs text-gray-500 mt-1 truncate w-full">
                        {item.details.length > 0 ? item.details[0].label : 'Stable'}
                      </p>
                   )}
                </div>

              </div>

              {/* Status Bar for Primary Card */}
              {isPrimary && item.deductions.length > 0 && (
                 <div className="mt-4 flex items-center bg-white/60 rounded-lg px-3 py-2 backdrop-blur-sm border border-gray-100/50">
                    <AlertTriangle size={14} className="text-ios-orange mr-2" />
                    <span className="text-xs text-gray-600 truncate">
                      Alert: <span className="font-medium text-gray-900">{item.deductions[0].reason}</span>
                    </span>
                 </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-slide-up sm:animate-fade-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Details Link */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{selectedRisk.title}</h3>
              <div className="flex items-center space-x-3">
                 <button 
                  onClick={handleDetailsClick}
                  className="flex items-center text-ios-blue text-sm font-semibold active:opacity-50"
                 >
                   Details <ArrowRight size={16} className="ml-1" />
                 </button>
                 <button onClick={closeModal} className="p-1 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mini Chart Visualization inside Modal */}
            <div className="h-48 w-full mb-6 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                        { subject: 'Behavior', A: 72, fullMark: 100 },
                        { subject: 'Battery', A: 92, fullMark: 100 },
                        { subject: 'Env', A: 65, fullMark: 100 },
                    ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{fontSize: 10}} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false}/>
                    <Radar name="My Risk" dataKey="A" stroke="#007AFF" fill="#007AFF" fillOpacity={0.3} />
                    </RadarChart>
                 </ResponsiveContainer>
                 <div className="absolute top-0 right-0 text-xs text-gray-400 bg-gray-50 p-1 rounded">Overall View</div>
            </div>

            <div className="space-y-4">
               {/* Status Metrics */}
               <div className="bg-gray-50 p-4 rounded-xl">
                 <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Current Status</h4>
                 <div className="grid grid-cols-2 gap-4">
                   {selectedRisk.details.map((detail, idx) => (
                     <div key={idx}>
                       <span className="text-xs text-gray-400 block">{detail.label}</span>
                       <span className={`text-sm font-medium ${detail.isWarning ? 'text-ios-red' : 'text-gray-800'}`}>
                         {detail.value}
                       </span>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Deductions */}
               {selectedRisk.deductions.length > 0 && (
                 <div>
                   <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Deductions</h4>
                   {selectedRisk.deductions.map((deduction, idx) => (
                     <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                       <div className="flex items-center text-gray-700 text-sm">
                         <AlertTriangle size={14} className="text-ios-orange mr-2" />
                         {deduction.reason}
                       </div>
                       <span className="text-ios-red font-bold text-sm">{deduction.points} pts</span>
                     </div>
                   ))}
                 </div>
               )}
            </div>
            
            <button 
                onClick={closeModal}
                className="w-full mt-6 bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-semibold shadow-sm active:scale-95 transition-transform"
            >
                Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for X icon
const X: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
