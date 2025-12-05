
import React from 'react';
import { ChevronLeft, CloudRain, Wind, Eye, AlertTriangle, MapPin, Navigation, Zap, Clock, ShieldAlert } from 'lucide-react';
import { ENVIRONMENT_DETAILS } from '../../constants';

interface EnvironmentViewProps {
  onBack: () => void;
}

const EnvironmentView: React.FC<EnvironmentViewProps> = ({ onBack }) => {
  const { weather, alerts, routes } = ENVIRONMENT_DETAILS;

  return (
    <div className="min-h-screen bg-ios-bg pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-ios-blue flex items-center active:opacity-50">
          <ChevronLeft size={24} />
          <span className="font-medium text-lg">Back</span>
        </button>
        <h1 className="font-bold text-lg text-black absolute left-1/2 transform -translate-x-1/2">Real-time Environment</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Real-time Weather Card */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
           <div className="flex justify-between items-start">
             <div>
               <div className="flex items-center space-x-2 mb-1">
                  <CloudRain size={28} className="text-blue-300" />
                  <span className="text-2xl font-bold">{weather.temp}</span>
               </div>
               <p className="font-medium text-lg">{weather.condition}</p>
             </div>
             <div className="text-right space-y-1">
               <div className="flex items-center justify-end text-xs text-slate-300">
                 <Eye size={14} className="mr-1" /> Visibility: {weather.visibility}
               </div>
               <div className="flex items-center justify-end text-xs text-orange-300">
                 <Wind size={14} className="mr-1" /> Road Friction: {weather.roadFriction}
               </div>
             </div>
           </div>
        </div>

        {/* Interactive Risk Map */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative h-64">
           <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
             <h3 className="text-xs font-bold text-gray-900 flex items-center">
               <ShieldAlert size={14} className="text-red-500 mr-1.5" /> 
               Live Risk Map
             </h3>
           </div>
           
           {/* SVG Map Visualization */}
           <div className="absolute inset-0 bg-[#F2F2F7]">
             <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                {/* City Blocks */}
                <rect x="50" y="50" width="80" height="80" fill="#E5E5EA" rx="4" />
                <rect x="180" y="40" width="120" height="60" fill="#E5E5EA" rx="4" />
                <rect x="60" y="180" width="100" height="80" fill="#E5E5EA" rx="4" />
                <rect x="220" y="150" width="120" height="100" fill="#E5E5EA" rx="4" />
                
                {/* Roads */}
                <line x1="155" y1="0" x2="155" y2="300" stroke="white" strokeWidth="25" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="white" strokeWidth="25" />
                
                {/* Traffic Congestion (Red) */}
                <line x1="155" y1="100" x2="155" y2="180" stroke="#FF3B30" strokeWidth="6" strokeLinecap="round" opacity="0.6" className="animate-pulse" />
                
                {/* Traffic Flow (Green) */}
                <line x1="155" y1="0" x2="155" y2="90" stroke="#34C759" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                
                {/* Accident Marker */}
                <g transform="translate(155, 120)">
                   <circle r="8" fill="#FF3B30" opacity="0.3" className="animate-ping" />
                   <circle r="4" fill="#FF3B30" stroke="white" strokeWidth="1" />
                </g>
                
                {/* Violation Hotspot */}
                <g transform="translate(280, 140)">
                   <rect x="-6" y="-6" width="12" height="12" fill="#FF9500" opacity="0.3" className="animate-pulse" />
                   <text x="8" y="4" fontSize="10" fill="#FF9500" fontWeight="bold">Camera</text>
                </g>
             </svg>
           </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
           <h3 className="font-bold text-gray-900 px-1">Active Alerts</h3>
           {alerts.map((alert) => (
             <div key={alert.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start">
               <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${
                 alert.severity === 'High' ? 'bg-red-100 text-red-600' : 
                 alert.severity === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
               }`}>
                 <AlertTriangle size={20} />
               </div>
               <div>
                 <h4 className={`text-sm font-bold mb-0.5 ${
                   alert.severity === 'High' ? 'text-red-700' : 'text-gray-900'
                 }`}>
                   {alert.type} Alert
                 </h4>
                 <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
               </div>
             </div>
           ))}
        </div>

        {/* Smart Route Planning */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-l-ios-blue">
           <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center">
                  <Navigation size={20} className="mr-2 text-ios-blue" />
                  Smart Route
                </h3>
                <p className="text-xs text-gray-400 mt-1">Based on "Aggressive" profile</p>
              </div>
           </div>

           <div className="space-y-4">
              {routes.map((route) => (
                <div 
                  key={route.id} 
                  className={`p-4 rounded-xl border relative cursor-pointer active:scale-[0.98] transition-all ${
                    route.tag === 'Energy Saver' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  {route.tag === 'Energy Saver' && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-sm">
                      <Zap size={10} className="mr-1" fill="currentColor" /> Recommended
                    </div>
                  )}
                  
                  <div className="flex justify-between items-end mb-2">
                    <h4 className="font-bold text-gray-900">{route.name}</h4>
                    <span className="text-xs font-mono text-gray-500">{route.distance}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm mb-3">
                     <span className="flex items-center font-bold text-gray-800">
                       <Clock size={14} className="mr-1.5 text-gray-400" /> {route.duration}
                     </span>
                     <span className={`flex items-center font-bold ${route.tag === 'Energy Saver' ? 'text-green-700' : 'text-gray-600'}`}>
                       <Zap size={14} className="mr-1.5" /> {route.energyConsumption}
                     </span>
                  </div>

                  {/* Savings Highlight */}
                  {route.savings && (
                    <div className="bg-white/60 rounded-lg p-2 text-xs text-green-800 font-medium flex items-center">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                       {route.savings} <span className="mx-1 text-green-300">|</span> {route.rangeEquivalent}
                    </div>
                  )}

                  {/* Features */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {route.features.map((f, i) => (
                      <span key={i} className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default EnvironmentView;
