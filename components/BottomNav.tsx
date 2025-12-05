
import React from 'react';
import { Home, ShieldCheck, PieChart, LayoutGrid } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-6 py-2 pb-6 z-30">
      <div className="flex justify-between items-center">
        <NavItem 
          icon={<Home size={24} />} 
          label="Home" 
          active={currentView === 'home'} 
          onClick={() => onNavigate('home')} 
        />
        <NavItem 
          icon={<ShieldCheck size={24} />} 
          label="Insurance" 
          active={currentView === 'Insurance'}
          onClick={() => onNavigate('Insurance')}
        />
        <NavItem 
          icon={<PieChart size={24} />} 
          label="Analysis" 
          // Maps Analysis tab to the Behavior detail view for now
          onClick={() => onNavigate('Behavior')} 
          active={currentView === 'Behavior' || currentView === 'Battery' || currentView === 'Environment'}
        />
        <NavItem 
          icon={<LayoutGrid size={24} />} 
          label="More" 
          onClick={() => {}} 
        />
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 ${active ? 'text-ios-blue' : 'text-gray-400'} active:scale-95 transition-transform`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
