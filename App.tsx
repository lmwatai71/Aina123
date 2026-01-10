import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import { CropsView, LivestockView, PlanningView, AboutView, SurveyView } from './components/ReferenceViews';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.CHAT);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatInterface />;
      case AppView.CROPS:
        return <CropsView />;
      case AppView.LIVESTOCK:
        return <LivestockView />;
      case AppView.PLANNING:
        return <PlanningView />;
      case AppView.SURVEY:
        return <SurveyView />;
      case AppView.ABOUT:
        return <AboutView />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-emerald-900 flex items-center px-4 flex-shrink-0 shadow-md z-10">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-emerald-50 p-2 hover:bg-emerald-800 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <span className="ml-3 text-emerald-50 font-bold text-lg tracking-wide">AinaMind</span>
        </div>

        {/* View Content */}
        <div className="flex-1 overflow-hidden relative w-full h-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;