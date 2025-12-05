import React from 'react';
import { SUGGESTIONS } from '../constants';
import { Lightbulb } from 'lucide-react';

export const Suggestions: React.FC = () => {
  return (
    <div className="py-4 pb-24">
      <div className="px-6 mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Optimization</h2>
        <span className="text-xs text-ios-blue font-medium">See All</span>
      </div>
      
      <div className="flex overflow-x-auto px-6 space-x-4 pb-4 no-scrollbar snap-x snap-mandatory">
        {SUGGESTIONS.map((item) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 w-72 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 snap-center"
          >
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-full mr-3 ${item.type === 'Critical' ? 'bg-red-50 text-ios-red' : 'bg-blue-50 text-ios-blue'}`}>
                <Lightbulb size={18} />
              </div>
              <span className={`text-xs font-bold uppercase ${item.type === 'Critical' ? 'text-ios-red' : 'text-ios-blue'}`}>
                {item.type}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};