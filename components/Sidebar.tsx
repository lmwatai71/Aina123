import React from 'react';
import { MessageSquare, Sprout, Tractor, Map as MapIcon, Leaf, Info } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { id: AppView.CHAT, label: 'Kūkākūkā (Chat)', icon: MessageSquare },
    { id: AppView.CROPS, label: 'Nā Mea Kanu (Crops)', icon: Leaf },
    { id: AppView.LIVESTOCK, label: 'Holoholona (Livestock)', icon: Tractor },
    { id: AppView.PLANNING, label: 'Hoʻolālā (Planning)', icon: MapIcon },
    { id: AppView.ABOUT, label: 'Moʻolelo (About)', icon: Info },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-emerald-900 text-stone-50 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col shadow-xl
      `}>
        <div className="p-6 border-b border-emerald-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center font-bold text-lg">
            <Sprout size={20} />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide">AinaMind</h1>
            <p className="text-xs text-emerald-300 uppercase tracking-wider">Farm Assistant</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium
                ${currentView === item.id 
                  ? 'bg-emerald-800 text-white shadow-md border-l-4 border-emerald-400' 
                  : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-emerald-800">
          <div className="bg-emerald-950/50 rounded-lg p-4 text-xs text-emerald-300 leading-relaxed">
            <p className="mb-2 font-semibold text-emerald-200">Mālama ʻĀina</p>
            <p>"He aliʻi ka ʻāina, he kauwā ke kanaka."</p>
            <p className="italic opacity-75 mt-1">The land is chief, man is its servant.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;