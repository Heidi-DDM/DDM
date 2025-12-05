
import React, { useEffect, useState } from 'react';
import { USER_DATA } from '../constants';
import { Flame, ShieldCheck } from 'lucide-react';

const getColor = (score: number) => {
  if (score >= 80) return '#34C759'; // Green
  if (score >= 60) return '#FFCC00'; // Yellow
  if (score >= 40) return '#FF9500'; // Orange
  return '#FF3B30'; // Red
};

export const ScoreGauge: React.FC = () => {
  const score = USER_DATA.totalScore;
  const color = getColor(score);
  const [scanning, setScanning] = useState(true);
  
  // SVG Config
  const size = 220;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    // Simulate initial system scan
    const timer = setTimeout(() => setScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6 relative">
      
      {/* Gamification Badge: Safety Streak */}
      <div className="absolute top-4 right-4 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full flex items-center border border-orange-100 shadow-sm animate-in fade-in zoom-in duration-500 delay-300">
         <Flame size={14} className="mr-1.5 fill-current" />
         <span className="text-xs font-bold">{USER_DATA.safetyStreak} Day Streak</span>
      </div>

      <div className="relative w-[220px] h-[220px]">
        {/* Scanning Effect Overlay */}
        {scanning && (
          <div className="absolute inset-0 rounded-full border-4 border-t-ios-blue border-r-transparent border-b-transparent border-l-transparent animate-spin z-10 pointer-events-none opacity-50"></div>
        )}

        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#E5E5EA"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            {scanning ? (
               <span className="text-sm font-bold text-ios-blue animate-pulse uppercase tracking-widest">Scanning...</span>
            ) : (
               <>
                 <span className="text-5xl font-bold tracking-tight text-gray-900 animate-in zoom-in duration-300">{score}</span>
                 <span className="text-sm font-medium text-gray-500 mt-1">Safety Score</span>
               </>
            )}
        </div>
      </div>

      <div className={`mt-6 flex flex-col items-center transition-all duration-500 ${scanning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="flex items-center text-gray-500 text-sm mb-1">
           <ShieldCheck size={14} className="mr-1.5" />
           <span>Estimated Insurance Discount</span>
        </div>
        <p className="text-3xl font-bold text-ios-blue">{USER_DATA.discountRate}% OFF</p>
      </div>
      
      <div className="mt-3 px-6 text-center">
        <p className="text-[10px] text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full inline-block">
          Score updates daily • Discount updates monthly
        </p>
      </div>
    </div>
  );
};
