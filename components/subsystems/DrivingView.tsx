
import React, { useState } from 'react';
import { DRIVING_DETAILS } from '../../constants';
import { ChevronLeft, MapPin, Zap, PlayCircle, X, ChevronRight, Calendar, List, RotateCcw } from 'lucide-react';
import { RiskLevel, DailyStats } from '../../types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, ReferenceDot } from 'recharts';

interface DrivingViewProps {
  onBack: () => void;
  onNavigateToTraining: () => void;
}

const DrivingView: React.FC<DrivingViewProps> = ({ onBack, onNavigateToTraining }) => {
  const { score: avgScore, mileage: totalMileage, duration: totalDuration, avgSpeed: avgSpd, energy: avgEnergy, dailyData, history } = DRIVING_DETAILS;
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Derived Data based on selection
  const currentData: DailyStats | typeof DRIVING_DETAILS = selectedDate && dailyData[selectedDate] 
    ? dailyData[selectedDate] 
    : DRIVING_DETAILS;

  // If in daily view, we get specific values, otherwise defaults
  const displayScore = selectedDate ? (currentData as DailyStats).score : avgScore;
  const displayMileage = selectedDate ? (currentData as DailyStats).mileage : totalMileage;
  const displayDuration = selectedDate ? (currentData as DailyStats).duration : totalDuration;
  const displaySpeed = selectedDate ? (currentData as DailyStats).avgSpeed : avgSpd;
  const displayEnergy = selectedDate ? (currentData as DailyStats).energy : avgEnergy;
  
  // Flatten events from all days if in overview, or just specific day
  const displayEvents = selectedDate 
    ? (currentData as DailyStats).events 
    : Object.values(dailyData).flatMap(d => d.events).sort((a,b) => b.id.localeCompare(a.id)); // Simple sort by ID (date-index)

  // Determine ring color
  const ringColor = displayScore > 80 ? '#34C759' : displayScore > 60 ? '#FFCC00' : '#FF3B30';
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayScore / 100) * circumference;

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 5000); 
  };

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedData = data.activePayload[0].payload;
      setSelectedDate(clickedData.date);
    }
  };

  return (
    <div className="min-h-screen bg-ios-bg pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-ios-blue flex items-center active:opacity-50">
          <ChevronLeft size={24} />
          <span className="font-medium text-lg">Back</span>
        </button>
        <h1 className="font-bold text-lg text-black absolute left-1/2 transform -translate-x-1/2">
           {selectedDate ? 'Daily Detail' : 'Driving Behavior'}
        </h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Score Ring Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center relative transition-all duration-300">
           
           {/* Context Label & Reset Button */}
           <div className="flex items-center justify-between w-full mb-4 px-2">
              <div className={`flex items-center space-x-2 rounded-full px-3 py-1 ${selectedDate ? 'bg-ios-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <Calendar size={14} />
                  <span className="text-xs font-semibold">
                    {selectedDate ? `Date: ${selectedDate}` : 'Last 30 Days'}
                  </span>
              </div>
              
              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="flex items-center text-xs font-semibold text-ios-blue bg-blue-50 px-3 py-1 rounded-full active:bg-blue-100"
                >
                  <RotateCcw size={12} className="mr-1" /> Reset View
                </button>
              )}
           </div>
           
           {/* Ring Chart */}
           <div className="relative w-[160px] h-[160px] mb-6">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} strokeLinecap="round"/>
               <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={ringColor} strokeWidth={strokeWidth} 
                       strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" 
                       className="transition-all duration-700 ease-out"/>
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-4xl font-bold text-gray-900 transition-all duration-300">{displayScore}</span>
               <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {selectedDate ? 'Daily Score' : 'Avg Score'}
               </span>
             </div>
           </div>
           
           {/* 30-Day Trend Chart */}
           <div className="w-full h-32 mb-4 relative group">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history} onClick={handleChartClick}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    itemStyle={{color: '#007AFF', fontSize: '12px', fontWeight: 'bold'}}
                    cursor={{stroke: '#007AFF', strokeWidth: 1}}
                    labelStyle={{color: '#666', fontSize: '10px'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#007AFF" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    strokeWidth={2} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  {/* Highlight selected day if any */}
                  {selectedDate && (
                      <ReferenceDot 
                        x={history.find(h => h.date === selectedDate)?.day} 
                        y={displayScore} 
                        r={6} 
                        fill="#007AFF" 
                        stroke="white" 
                        strokeWidth={2} 
                      />
                  )}
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-center text-[10px] text-gray-400 mt-1">
                {selectedDate ? 'Click another point to switch day' : 'Tap on chart to view daily details'}
              </p>
           </div>
           
           {/* Stats Grid */}
           <div className="w-full grid grid-cols-4 gap-2 text-center border-t border-gray-100 pt-4">
              <div>
                 <p className="text-xs text-gray-400 mb-1">Distance</p>
                 <p className="font-semibold text-sm truncate px-1">{displayMileage}</p>
              </div>
              <div>
                 <p className="text-xs text-gray-400 mb-1">Time</p>
                 <p className="font-semibold text-sm truncate px-1">{displayDuration}</p>
              </div>
              <div>
                 <p className="text-xs text-gray-400 mb-1">Avg Speed</p>
                 <p className="font-semibold text-sm truncate px-1">{displaySpeed}</p>
              </div>
              <div>
                 <p className="text-xs text-gray-400 mb-1">Energy</p>
                 <p className="font-semibold text-sm truncate px-1">{displayEnergy}</p>
              </div>
           </div>
        </div>

        {/* Map Replay Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative h-56 border border-gray-100">
           {/* Visual Map Representation */}
           <div className="absolute inset-0 bg-[#F2F2F7]">
             <svg className="w-full h-full">
                {/* Background Roads */}
                <path d="M -20 180 Q 80 180, 120 120 T 250 100 T 350 150" stroke="white" strokeWidth="20" fill="none" />
                <path d="M -20 180 Q 80 180, 120 120 T 250 100 T 350 150" stroke="#E5E5EA" strokeWidth="12" fill="none" />
                
                {/* Risk Points for selected day or sample if many */}
                {displayEvents.slice(0, 5).map((evt, idx) => (
                   <g key={evt.id}>
                      <circle cx={100 + idx*40} cy={100 + (idx%2)*30} r="4" fill={evt.riskLevel === RiskLevel.High ? '#FF3B30' : '#FF9500'} className="animate-pulse" />
                      <circle cx={100 + idx*40} cy={100 + (idx%2)*30} r="12" stroke={evt.riskLevel === RiskLevel.High ? '#FF3B30' : '#FF9500'} strokeWidth="1" fill="none" opacity="0.3" />
                   </g>
                ))}
                
                {/* Animated Vehicle */}
                <circle r="6" fill="#007AFF" className={`${isPlaying ? 'animate-move-path' : ''}`} style={{ offsetPath: 'path("M -20 180 Q 80 180, 120 120 T 250 100 T 350 150")', offsetDistance: '0%' }}>
                   {isPlaying && <animate attributeName="opacity" values="1;1" dur="5s" />}
                </circle>
             </svg>
             <style>{`
               @keyframes movePath {
                 0% { offset-distance: 0%; }
                 100% { offset-distance: 100%; }
               }
               .animate-move-path {
                 animation: movePath 5s linear infinite;
               }
             `}</style>
           </div>
           
           <div className="absolute bottom-3 right-3 z-10">
              <button 
                onClick={togglePlayback}
                className="bg-white/90 backdrop-blur text-xs font-bold text-gray-900 px-3 py-1.5 rounded-lg shadow border border-gray-200 flex items-center active:scale-95 transition-transform"
              >
                 {isPlaying ? <span className="w-2 h-2 bg-red-500 rounded-sm mr-2"></span> : <PlayCircle size={14} className="mr-1.5" />}
                 {isPlaying ? 'Playing...' : `Replay ${selectedDate ? 'Daily' : 'Latest'} Trip`}
              </button>
           </div>
           {displayEvents.length > 0 && (
            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-500 flex items-center z-10 max-w-[70%] truncate">
              <MapPin size={12} className="mr-1 flex-shrink-0" /> 
              <span className="truncate">{displayEvents[0].location} ({displayEvents[0].type})</span>
            </div>
           )}
        </div>

        {/* Risk Events List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-900">
               {selectedDate ? 'Daily Events' : 'Recent Risk Events'}
             </h3>
             <button 
                onClick={() => setShowAllEvents(true)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium transition-colors"
             >
               View All ({displayEvents.length})
             </button>
           </div>
           
           <div className="space-y-0">
             {displayEvents.length === 0 ? (
               <div className="text-center py-6 text-gray-400 text-sm">No risk events recorded for this period.</div>
             ) : (
               displayEvents.slice(0, 3).map((evt) => (
                 <EventItem key={evt.id} evt={evt} />
               ))
             )}
           </div>
        </div>

        {/* AI Suggestion & Training Link */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl">
           <div className="flex items-start mb-4">
              <div className="p-2.5 bg-white/20 rounded-xl mr-3 shadow-inner">
                 <Zap size={24} className="text-yellow-300" />
              </div>
              <div>
                 <h3 className="font-bold text-base mb-1">Personalized Improvement</h3>
                 <p className="text-xs opacity-90 leading-relaxed font-medium">
                   Sudden braking accounts for 60% of your risk score deductions. We have curated a specific training plan for you.
                 </p>
              </div>
           </div>
           <button 
              onClick={onNavigateToTraining}
              className="w-full bg-white text-indigo-700 hover:bg-indigo-50 text-sm font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center"
           >
              View Detailed Training <ChevronRight size={16} className="ml-1" />
           </button>
        </div>
      </div>

      {/* All Events Modal */}
      {showAllEvents && (
        <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom duration-300 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white/90 backdrop-blur">
             <h2 className="font-bold text-lg">
               {selectedDate ? `Events on ${selectedDate}` : 'All Risk Events'}
             </h2>
             <button onClick={() => setShowAllEvents(false)} className="p-2 bg-gray-100 rounded-full">
               <X size={20} className="text-gray-600" />
             </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-ios-bg">
             <div className="bg-white rounded-2xl p-4 shadow-sm">
                {displayEvents.length === 0 ? (
                   <div className="text-center py-10 text-gray-400">No events found.</div>
                ) : (
                   displayEvents.map((evt, index) => (
                      <div key={evt.id} className={index !== displayEvents.length - 1 ? "mb-6" : ""}>
                         <EventItem evt={evt} isLast={index === displayEvents.length - 1} />
                      </div>
                   ))
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for event item
const EventItem: React.FC<{ evt: any; isLast?: boolean }> = ({ evt, isLast }) => (
  <div className={`relative pl-6 ${!isLast ? 'pb-2 border-l-2 border-gray-100' : ''}`}>
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
        evt.riskLevel === RiskLevel.High ? 'bg-red-500' : 
        evt.riskLevel === RiskLevel.Medium ? 'bg-orange-400' : 'bg-green-400'
      }`}></div>
      <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-gray-400 font-mono block mb-0.5">{evt.time}</span>
            <h4 className="font-semibold text-gray-900 text-sm">{evt.type}</h4>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin size={12} className="mr-1"/> {evt.location}
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
            evt.riskLevel === RiskLevel.High ? 'bg-red-50 text-red-600 border-red-100' : 
            evt.riskLevel === RiskLevel.Medium ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
          }`}>
            {evt.riskLevel}
          </span>
      </div>
  </div>
);

export default DrivingView;
