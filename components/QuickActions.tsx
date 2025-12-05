
import React from 'react';
import { Scan, FileWarning, Headphones, FileText } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Quick Scan', icon: <Scan size={22} />, color: 'bg-blue-500 text-white' },
    { label: 'Report Issue', icon: <FileWarning size={22} />, color: 'bg-white text-gray-700 border border-gray-200' },
    { label: 'My Policy', icon: <FileText size={22} />, color: 'bg-white text-gray-700 border border-gray-200' },
    { label: 'Support', icon: <Headphones size={22} />, color: 'bg-white text-gray-700 border border-gray-200' },
  ];

  return (
    <div className="px-6 py-2 overflow-x-auto no-scrollbar">
      <div className="flex space-x-4 min-w-max">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-center space-y-2 group active:opacity-70 transition-opacity"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-active:scale-95 transition-transform ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-[10px] font-semibold text-gray-500">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
