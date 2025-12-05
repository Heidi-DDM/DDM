
import React from 'react';
import { ChevronLeft, Play, Award, Calendar, ChevronRight, Video, Target } from 'lucide-react';
import { TRAINING_VIDEOS, TRAINING_COURSE } from '../../constants';

interface TrainingViewProps {
  onBack: () => void;
}

const TrainingView: React.FC<TrainingViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-ios-bg pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-ios-blue flex items-center active:opacity-50">
          <ChevronLeft size={24} />
          <span className="font-medium text-lg">Back</span>
        </button>
        <h1 className="font-bold text-lg text-black absolute left-1/2 transform -translate-x-1/2">Improvement Plan</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Analysis Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
           <div className="flex items-center mb-3 text-ios-blue">
             <Target size={20} className="mr-2" />
             <h3 className="font-bold text-gray-900 text-lg">Focus Area: Braking</h3>
           </div>
           <p className="text-gray-600 text-sm leading-relaxed">
             Based on your data from the last 30 days, <span className="font-bold text-gray-900">Sudden Braking</span> is your primary risk factor. Smoothing out your deceleration can improve your score by ~12 points.
           </p>
           
           <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">High Risk</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Reoccurs Daily</span>
           </div>
        </div>

        {/* Video Tutorials */}
        <div>
           <h3 className="font-bold text-gray-900 mb-3 px-1 flex items-center">
             <Video size={18} className="mr-2 text-gray-500" /> 
             Recommended Videos
           </h3>
           <div className="flex overflow-x-auto space-x-4 pb-4 px-1 no-scrollbar snap-x">
             {TRAINING_VIDEOS.map((video) => (
               <div key={video.id} className="flex-shrink-0 w-64 snap-center group cursor-pointer active:scale-95 transition-transform">
                  <div className={`aspect-video ${video.thumbnailColor} rounded-xl mb-2 relative flex items-center justify-center shadow-sm`}>
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Play size={16} className="ml-1 text-gray-900" />
                     </div>
                     <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                       {video.duration}
                     </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-1">{video.title}</h4>
                  <p className="text-xs text-gray-500">Suggested for you</p>
               </div>
             ))}
           </div>
        </div>

        {/* Offline Course */}
        <div className="bg-white rounded-2xl p-0 overflow-hidden shadow-sm border border-gray-100">
           <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-white/10 rounded-lg">
                    <Award size={24} className="text-yellow-400" />
                 </div>
                 <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    Highly Recommended
                 </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{TRAINING_COURSE.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                 {TRAINING_COURSE.description}
              </p>
              
              <div className="flex items-center text-xs text-gray-400 space-x-4">
                 <div className="flex items-center">
                    <Calendar size={14} className="mr-1.5" /> {TRAINING_COURSE.date}
                 </div>
                 <div>{TRAINING_COURSE.location}</div>
              </div>
           </div>
           
           <div className="p-4 bg-white flex items-center justify-between">
              <div>
                 <p className="text-xs text-gray-500">Course Fee</p>
                 <p className="text-lg font-bold text-gray-900">{TRAINING_COURSE.price}</p>
              </div>
              <button className="bg-black text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg active:scale-95 transition-transform">
                 Sign Up Now
              </button>
           </div>
        </div>

        {/* Text Suggestion Card */}
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
           <h4 className="font-bold text-gray-900 mb-2 text-sm">Pro Tip: The 3-Second Rule</h4>
           <p className="text-xs text-gray-600 leading-relaxed">
             To avoid sudden braking, always maintain a 3-second gap from the vehicle in front. In rain (which you encounter often), increase this to 5 seconds.
           </p>
        </div>

      </div>
    </div>
  );
};

export default TrainingView;
