
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import { CropsView, LivestockView, PlanningView, AboutView, MarketplaceView, LaauView, BarterView, PestControlView } from './components/ReferenceViews';
import { ProfileView, CommunityView } from './components/UserViews';
import { AppView, Message, MarketItem, UserProfile, CommunityPost, BarterItem, LaauPlant } from './types';
import { INITIAL_MARKET_ITEMS, INITIAL_COMMUNITY_POSTS, INITIAL_BARTER_ITEMS, LAAU_DATA } from './constants';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.CHAT);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lifted State for Persistence
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Aloha mai kāua! I am AinaMind. 

ʻŌlelo Hawaiʻi:
Eia au e kōkua iā ʻoe me ka mahi ʻai a me ka mālama ʻāina. He aha kāu e hana nei i kēia lā?

English:
I am here to help you with farming and land stewardship. What are you working on today?`,
      timestamp: Date.now()
    }
  ]);

  const [marketItems, setMarketItems] = useState<MarketItem[]>(INITIAL_MARKET_ITEMS);
  const [barterItems, setBarterItems] = useState<BarterItem[]>(INITIAL_BARTER_ITEMS);
  const [laauData, setLaauData] = useState<Record<string, LaauPlant[]>>(LAAU_DATA);
  
  // User Authentication State
  const [user, setUser] = useState<UserProfile | null>(null);

  // Community Posts State
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatInterface messages={messages} setMessages={setMessages} />;
      case AppView.CROPS:
        return <CropsView />;
      case AppView.LIVESTOCK:
        return <LivestockView />;
      case AppView.PESTS:
        return <PestControlView />;
      case AppView.LAAU:
        return (
          <LaauView 
            data={laauData}
            onUpdateData={setLaauData}
          />
        );
      case AppView.PLANNING:
        return <PlanningView />;
      case AppView.COMMUNITY:
        return (
          <CommunityView 
            posts={communityPosts}
            onAddPost={(post) => setCommunityPosts([post, ...communityPosts])}
            user={user}
          />
        );
      case AppView.MARKETPLACE:
        return (
          <MarketplaceView 
            items={marketItems} 
            onAddItem={(item) => setMarketItems(prev => [item, ...prev])} 
          />
        );
      case AppView.BARTER:
        return (
          <BarterView
            items={barterItems}
            onAddItem={(item) => setBarterItems(prev => [item, ...prev])}
          />
        );
      case AppView.PROFILE:
        return (
          <ProfileView 
            user={user} 
            onLogin={(u) => setUser(u)} 
            onLogout={() => setUser(null)}
          />
        );
      case AppView.ABOUT:
        return <AboutView />;
      default:
        return <ChatInterface messages={messages} setMessages={setMessages} />;
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
