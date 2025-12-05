
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScoreGauge } from './components/ScoreGauge';
import { RiskCards } from './components/RiskCards';
import { Suggestions } from './components/Suggestions';
import { AIChat } from './components/AIChat';
import { BottomNav } from './components/BottomNav';
import { QuickActions } from './components/QuickActions';
import DrivingView from './components/subsystems/DrivingView';
import BatteryView from './components/subsystems/BatteryView';
import EnvironmentView from './components/subsystems/EnvironmentView';
import TrainingView from './components/subsystems/TrainingView';
import InsuranceView from './components/subsystems/InsuranceView';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Behavior':
        return <DrivingView onBack={() => handleNavigate('home')} onNavigateToTraining={() => handleNavigate('Training')} />;
      case 'Training':
        return <TrainingView onBack={() => handleNavigate('Behavior')} />;
      case 'Battery':
        return <BatteryView onBack={() => handleNavigate('home')} />;
      case 'Environment':
        return <EnvironmentView onBack={() => handleNavigate('home')} />;
      case 'Insurance':
        return <InsuranceView onBack={() => handleNavigate('home')} />;
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-ios-bg text-gray-900 font-sans pb-24 selection:bg-ios-blue selection:text-white overflow-hidden relative">
            {/* Improved Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-100/60 to-transparent rounded-full blur-3xl -z-0 pointer-events-none opacity-60"></div>
            
            <div className="relative z-10">
              <Header />
              <main className="max-w-2xl mx-auto pt-2">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <ScoreGauge />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-75 mb-4">
                    <QuickActions />
                </div>
                
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 -mt-2">
                    <RiskCards onNavigate={handleNavigate} />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <Suggestions />
                </div>
              </main>
              <AIChat />
              <BottomNav currentView={currentView} onNavigate={handleNavigate} />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default App;
