import React, { useState } from 'react';
import { Droplets, Calendar, Sun, Info, AlertCircle, MapPin, Ruler, Mountain, Sprout, Loader2, FileText, RefreshCw, Bot, ShoppingBag, Tag, Plus, X, Search, DollarSign, Filter, HeartPulse, Wind, Activity, Heart, Shield, Dumbbell } from 'lucide-react';
import { REFERENCE_CROPS, REFERENCE_LIVESTOCK, LAAU_DATA } from '../constants';
import { sendMessageToAinaMind } from '../services/geminiService';
import { MarketItem } from '../types';

export const CropsView: React.FC = () => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">Nā Mea Kanu (Crops)</h2>
          <p className="text-stone-600">A guide to staple crops for Hawaiʻi's unique environment.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {REFERENCE_CROPS.map((crop, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-emerald-100/50 p-4 border-b border-emerald-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">{crop.hawaiianName}</h3>
                  <p className="text-sm text-emerald-700 font-medium">{crop.name}</p>
                </div>
                <Sun className="text-amber-500" size={24} />
              </div>
              <div className="p-5 space-y-4">
                <p className="text-stone-700 leading-relaxed">{crop.description}</p>
                
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="text-emerald-600 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold text-stone-900 block">Planting Season</span>
                    <span className="text-stone-600">{crop.plantingSeason}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Droplets className="text-blue-500 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold text-stone-900 block">Water Needs</span>
                    <span className="text-stone-600">{crop.waterNeeds}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LivestockView: React.FC = () => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
       <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Holoholona (Livestock)</h2>
          <p className="text-stone-600">Integrating animals into a healthy farm ecosystem.</p>
        </header>

        <div className="space-y-6">
          {REFERENCE_LIVESTOCK.map((animal, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                 <div className="bg-stone-100 p-3 rounded-full w-fit">
                    <Info className="text-stone-600" size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-stone-900">{animal.hawaiianName} <span className="text-stone-500 font-normal">({animal.name})</span></h3>
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded mt-1 font-medium">
                      Focus: {animal.focus}
                    </div>
                 </div>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                <h4 className="font-semibold text-stone-800 mb-1 flex items-center gap-2">
                  <AlertCircle size={16} className="text-amber-600"/> 
                  Management Tips
                </h4>
                <p className="text-stone-600 text-sm">{animal.tips}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PlanningView: React.FC = () => {
  const [formData, setFormData] = useState({
    location: '',
    acreage: '',
    zoning: '',
    soil: '',
    water: '',
    goals: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.location || !formData.goals) return;

    setIsGenerating(true);
    
    // Construct a focused prompt for the AI including property details
    const prompt = `
I need a preliminary farm plan for a property with these details:

- Location/Ahupuaʻa: ${formData.location}
- Size: ${formData.acreage} acres
- Zoning: ${formData.zoning || "Unknown"}
- Soil Type: ${formData.soil || "Unknown"}
- Water Access: ${formData.water || "Unknown"}
- Goals: ${formData.goals}

Please provide specific guidance on layout, suitable crops, and conservation strategies based on this land profile.
    `.trim();

    try {
      // Pass empty history as this is a standalone request, system prompt provides the persona
      const response = await sendMessageToAinaMind([], prompt);
      setPlan(response);
    } catch (error) {
      console.error("Plan generation error", error);
      setPlan("E kala mai, there was an error generating your plan. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('ʻŌlelo Hawaiʻi:') || trimmed.startsWith('English:') || trimmed.startsWith('Next Actions:')) {
            return <h4 key={i} className="font-bold text-emerald-800 mt-6 mb-2 text-lg">{line}</h4>;
        }
        if (trimmed.startsWith('- ')) {
           return <li key={i} className="ml-4 list-disc mb-1">{line.substring(2)}</li>
        }
        return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
    });
  };

  if (plan) {
    return (
      <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setPlan(null)}
            className="mb-6 flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
          >
            <RefreshCw size={16} className="mr-2" /> Start Over (Hana Hou)
          </button>
          
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="bg-emerald-900 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText />
                Farm Plan Suggestion
              </h2>
              <p className="text-emerald-200 mt-1">Prepared for your land in {formData.location}</p>
            </div>
            <div className="p-8 text-stone-800">
               {formatContent(plan)}
            </div>
            <div className="bg-stone-50 p-4 text-center border-t border-stone-200 text-sm text-stone-500">
               This is an AI-generated suggestion. Always verify with local experts.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
       <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">Hana i ka Hoʻolālā (Create a Plan)</h2>
            <p className="text-stone-600">Tell us about your ʻāina, and AinaMind will draft a stewardship plan for you.</p>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Location */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Location / Ahupuaʻa</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Waimea, Hawaiʻi Island"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Acreage */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Total Acreage</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 text-stone-400" size={18} />
                  <input 
                    type="number" 
                    name="acreage"
                    value={formData.acreage}
                    onChange={handleInputChange}
                    placeholder="e.g. 2.5"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Zoning */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Zoning (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-stone-400" size={18} />
                  <select 
                    name="zoning"
                    value={formData.zoning}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                  >
                    <option value="">Select Zoning...</option>
                    <option value="Agricultural">Agricultural (Ag-5, Ag-20, etc)</option>
                    <option value="Residential">Residential</option>
                    <option value="Conservation">Conservation</option>
                    <option value="Rural">Rural</option>
                    <option value="Unknown">I don't know</option>
                  </select>
                </div>
              </div>

              {/* Soil */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Soil Type</label>
                <div className="relative">
                  <Mountain className="absolute left-3 top-3 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    name="soil"
                    value={formData.soil}
                    onChange={handleInputChange}
                    placeholder="e.g. Volcanic, Rocky, Clay"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Water */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Water Access</label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-3 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    name="water"
                    value={formData.water}
                    onChange={handleInputChange}
                    placeholder="e.g. County water, Catchment"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Goals */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Primary Goals & Vision</label>
                <div className="relative">
                  <Sprout className="absolute left-3 top-3 text-stone-400" size={18} />
                  <textarea 
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="What do you want to grow or raise? e.g. Subsistence farming for my ʻohana, growing kalo and raising sheep."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all min-h-[100px]"
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={!formData.location || !formData.goals || isGenerating}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all
                  ${(!formData.location || !formData.goals || isGenerating)
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-lg transform hover:-translate-y-0.5'}
                `}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Thinking...
                  </>
                ) : (
                  <>
                    Generate Farm Plan
                  </>
                )}
              </button>
            </div>
          </div>
       </div>
    </div>
  );
};

export const AboutView: React.FC = () => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center md:text-left mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">Moʻolelo (About AinaMind)</h2>
          <p className="text-stone-600 text-lg">Cultivating knowledge for Hawaiʻi's future.</p>
        </header>

        <div className="grid gap-6">
          <section className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Sprout size={24}/>
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Ka Misiona (Our Mission)</h3>
             </div>
             <p className="text-stone-700 leading-relaxed">
               AinaMind is designed to support Hawaiʻi's farmers, ranchers, and backyard growers. By combining modern agricultural science with traditional wisdom, we aim to foster food security and sustainable land stewardship across the pae ʻāina.
             </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Info size={24}/> 
                </div>
                 <h3 className="text-xl font-bold text-emerald-900">Bilingual by Design</h3>
             </div>
             <p className="text-stone-700 leading-relaxed">
               We believe that language shapes how we relate to the land. AinaMind provides responses in both <strong>ʻŌlelo Hawaiʻi</strong> and <strong>English</strong> to normalize the use of Hawaiian in daily agricultural practice and to honor the host culture of these islands.
             </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <Bot size={24}/>
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Powered by Gemini</h3>
             </div>
             <p className="text-stone-700 leading-relaxed mb-4">
               This application utilizes Google's Gemini API to process complex queries about soil, crops, and planning. It synthesizes vast amounts of agricultural data to provide tailored suggestions for your specific ahupuaʻa.
             </p>
             <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-stone-800 rounded-r">
               <strong>Disclaimer:</strong> AinaMind is an AI assistant. While it strives for accuracy, it is not a replacement for professional veterinary, legal, or financial advice. Always verify important decisions with local experts.
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const MarketplaceView: React.FC<{
  items: MarketItem[];
  onAddItem: (item: MarketItem) => void;
}> = ({ items, onAddItem }) => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [filter, setFilter] = useState('All');
  
  // New Item State (Local form state)
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Livestock',
    price: '',
    location: 'Hilo',
    description: '',
    contact: ''
  });

  const categories = ['All', 'Livestock', 'Crops', 'Solar/Energy', 'Equipment', 'Materials'];
  const locations = ['Hilo', 'Puna', 'Kaʻū', 'Kona', 'Kohala', 'Hāmākua'];

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.price || !newItem.contact) return;

    const item: MarketItem = {
      id: Date.now().toString(),
      title: newItem.title,
      category: newItem.category as any,
      price: newItem.price,
      location: newItem.location,
      description: newItem.description,
      contact: newItem.contact,
      timestamp: Date.now()
    };

    onAddItem(item);
    setShowPostForm(false);
    setNewItem({
      title: '',
      category: 'Livestock',
      price: '',
      location: 'Hilo',
      description: '',
      contact: ''
    });
  };

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
              <ShoppingBag className="text-emerald-600" />
              Mākeke (Marketplace)
            </h2>
            <p className="text-stone-600">Buy, sell, and trade for Hawaiʻi Island's off-grid community.</p>
          </div>
          <button 
            onClick={() => setShowPostForm(true)}
            className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-md flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Post Item
          </button>
        </header>

        {/* Post Item Modal/Overlay */}
        {showPostForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-emerald-50">
                <h3 className="font-bold text-lg text-emerald-900">Post New Item</h3>
                <button onClick={() => setShowPostForm(false)} className="text-stone-500 hover:text-stone-800">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handlePostItem} className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Item Title</label>
                  <input 
                    required
                    value={newItem.title}
                    onChange={e => setNewItem({...newItem, title: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 50 Gallon Water Drum"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                    <select 
                      value={newItem.category}
                      onChange={e => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Location (Big Island)</label>
                    <select 
                      value={newItem.location}
                      onChange={e => setNewItem({...newItem, location: e.target.value})}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      {locations.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Price</label>
                   <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 text-stone-400" size={16} />
                      <input 
                        required
                        value={newItem.price}
                        onChange={e => setNewItem({...newItem, price: e.target.value})}
                        className="w-full pl-9 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="e.g. 100 or Trade"
                      />
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                  <textarea 
                    value={newItem.description}
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none"
                    placeholder="Details about condition, age, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Contact Info</label>
                  <input 
                    required
                    value={newItem.contact}
                    onChange={e => setNewItem({...newItem, contact: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Phone number or email"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors">
                    Post Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
          {categories.map(cat => (
             <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border
                  ${filter === cat 
                    ? 'bg-emerald-800 text-white border-emerald-800' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}
                `}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredItems.map(item => (
             <div key={item.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="p-5 flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded font-medium mb-2 uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                        {item.price}
                      </span>
                   </div>
                   <h3 className="font-bold text-lg text-stone-900 mb-1">{item.title}</h3>
                   <div className="flex items-center text-stone-500 text-sm mb-3">
                      <MapPin size={14} className="mr-1" />
                      {item.location}
                   </div>
                   <p className="text-stone-600 text-sm line-clamp-3 mb-4">{item.description}</p>
                </div>
                <div className="bg-stone-50 px-5 py-3 border-t border-stone-100 mt-auto">
                   <div className="text-sm font-medium text-stone-800 flex items-center gap-2">
                      <span className="text-stone-400">Contact:</span> 
                      {item.contact}
                   </div>
                   <div className="text-xs text-stone-400 mt-1">
                      Posted {new Date(item.timestamp).toLocaleDateString()}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export const LaauView: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState('respiratory');

  const systems = [
    { id: 'respiratory', label: 'Respiratory (Hanu)', icon: Wind },
    { id: 'digestive', label: 'Digestive (Naʻau)', icon: Activity },
    { id: 'circulatory', label: 'Circulatory (Koko)', icon: Heart },
    { id: 'musculoskeletal', label: 'Muscles/Bones (Iwi/ʻIʻo)', icon: Dumbbell },
    { id: 'skin', label: 'Skin (ʻIli)', icon: Shield }
  ];

  const currentPlants = LAAU_DATA[selectedSystem] || [];

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
            <HeartPulse className="text-emerald-600" />
            Lāʻau Lapaʻau (Healing Plants)
          </h2>
          <p className="text-stone-600 mb-4">Traditional plant knowledge arranged by body system.</p>
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded text-amber-900 text-sm flex items-start gap-3">
             <AlertCircle className="flex-shrink-0 mt-0.5" size={18} />
             <div>
               <strong>Disclaimer:</strong> This information is for cultural and educational purposes only. 
               AinaMind does not provide medical advice. Please consult a qualified healthcare professional for any medical concerns.
             </div>
          </div>
        </header>

        {/* System Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-3 no-scrollbar">
          {systems.map((sys) => {
            const Icon = sys.icon;
            return (
              <button
                key={sys.id}
                onClick={() => setSelectedSystem(sys.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap shadow-sm
                  ${selectedSystem === sys.id 
                    ? 'bg-emerald-800 text-white shadow-md' 
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-emerald-50 hover:text-emerald-800'}
                `}
              >
                <Icon size={18} />
                {sys.label}
              </button>
            )
          })}
        </div>

        {/* Plant Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentPlants.map((plant, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">{plant.hawaiianName}</h3>
                  <p className="text-sm text-emerald-700 font-medium">{plant.plant} • {plant.type}</p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600">
                  <Sprout size={20} />
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Usage Section */}
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <HeartPulse size={12} /> Uses (Hoʻohana)
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-50">
                      <span className="block text-xs text-emerald-600 font-semibold mb-1">Hawaiian</span>
                      <p className="text-stone-800 italic">"{plant.use.hawaiian}"</p>
                    </div>
                    <div className="pl-3 border-l-2 border-stone-200">
                       <span className="block text-xs text-stone-400 font-semibold mb-1">English</span>
                       <p className="text-stone-600">{plant.use.english}</p>
                    </div>
                  </div>
                </div>

                {/* Preparation Section */}
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Filter size={12} /> Preparation (Hoʻomākaukau)
                  </h4>
                  <p className="text-stone-700 text-sm leading-relaxed mb-1">
                    <span className="font-semibold text-emerald-800">HI:</span> {plant.preparation.hawaiian}
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    <span className="font-semibold text-stone-500">EN:</span> {plant.preparation.english}
                  </p>
                </div>

                {/* Growing Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                   <div>
                      <div className="flex items-center gap-2 text-stone-800 font-semibold text-sm mb-1">
                        <MapPin size={14} className="text-amber-600" />
                        Where it Grows
                      </div>
                      <p className="text-xs text-stone-500 leading-snug">{plant.growsAbundantly}</p>
                   </div>
                   <div>
                      <div className="flex items-center gap-2 text-stone-800 font-semibold text-sm mb-1">
                        <Sun size={14} className="text-amber-500" />
                        Conditions
                      </div>
                      <p className="text-xs text-stone-500 leading-snug">{plant.howToGrow}</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
