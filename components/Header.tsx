
import React from 'react';
import { Bell, CloudRain, BatteryCharging } from 'lucide-react';
import { USER_DATA, BATTERY_DETAILS, ENVIRONMENT_DETAILS } from '../constants';

export const Header: React.FC = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <header className="px-6 pt-6 pb-2 bg-ios-bg sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-0.5">{greeting}, {USER_DATA.name}</h1>
          <p className="text-2xl font-bold text-gray-900 leading-tight">{USER_DATA.vehicleModel}</p>
          
          {/* Smart Context Chips */}
          <div className="flex space-x-2 mt-2">
            <div className="bg-white/60 backdrop-blur border border-gray-200/50 rounded-full px-2.5 py-1 flex items-center shadow-sm">
               <CloudRain size={12} className="text-blue-500 mr-1.5" />
               <span className="text-[10px] font-bold text-gray-700">{ENVIRONMENT_DETAILS.weather.temp} • {ENVIRONMENT_DETAILS.weather.condition}</span>
            </div>
            <div className="bg-white/60 backdrop-blur border border-gray-200/50 rounded-full px-2.5 py-1 flex items-center shadow-sm">
               <BatteryCharging size={12} className="text-green-500 mr-1.5" />
               <span className="text-[10px] font-bold text-gray-700">{BATTERY_DETAILS.factors[1].percentage ? '68%' : '68%'} • Good</span>
            </div>
          </div>
        </div>

        <button className="relative p-2.5 bg-white rounded-full shadow-sm active:scale-95 transition-transform border border-gray-100">
          <Bell size={20} className="text-gray-700" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
};
