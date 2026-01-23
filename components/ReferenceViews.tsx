
import React, { useState } from 'react';
import { Droplets, Calendar, Sun, Info, AlertCircle, MapPin, Ruler, Mountain, Sprout, Loader2, FileText, RefreshCw, Bot, ShoppingBag, Tag, Plus, X, Search, DollarSign, Filter, HeartPulse, Wind, Activity, Heart, Shield, Dumbbell, Camera, Map, Navigation, Hash, Instagram, Facebook, Music2, Check, Share2, ArrowLeftRight, Repeat, Phone, ExternalLink, Layers } from 'lucide-react';
import { REFERENCE_CROPS, REFERENCE_LIVESTOCK, AINA_SYSTEM_PROMPT } from '../constants';
import { sendMessageToAinaMind } from '../services/geminiService';
import { MarketItem, BarterItem, LaauPlant } from '../types';

export const CropsView: React.FC = () => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">Nā Mea Kanu (Crops)</h2>
          <p className="text-stone-600">A guide to staple crops for Hawaiʻi's unique environment.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REFERENCE_CROPS.map((crop, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
              {crop.imageUrl && (
                 <div className="h-48 md:h-auto md:w-1/3 relative bg-stone-100">
                    <img src={crop.imageUrl} alt={crop.name} className="absolute inset-0 w-full h-full object-cover" />
                 </div>
              )}
              <div className="flex-1 p-5">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900">{crop.hawaiianName}</h3>
                    <p className="text-sm text-emerald-700 font-medium">{crop.name}</p>
                  </div>
                  <Sun className="text-amber-500 flex-shrink-0" size={24} />
                </div>
                
                <p className="text-stone-700 leading-relaxed mb-4 text-sm">{crop.description}</p>
                
                <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm">
                      <Calendar className="text-emerald-600 mt-0.5 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-semibold text-stone-900 block">Planting Season</span>
                        <span className="text-stone-600">{crop.plantingSeason}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm">
                      <Droplets className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-semibold text-stone-900 block">Water Needs</span>
                        <span className="text-stone-600">{crop.waterNeeds}</span>
                      </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REFERENCE_LIVESTOCK.map((animal, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              {animal.imageUrl && (
                <div className="h-48 w-full relative bg-stone-100 border-b border-stone-100">
                  <img src={animal.imageUrl} alt={animal.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-800 shadow-sm flex items-center gap-1">
                     <Info size={12}/> {animal.hawaiianName}
                  </div>
                </div>
              )}
              <div className="p-6">
                 <div className="flex flex-col gap-2 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                           {animal.hawaiianName} 
                           <span className="text-stone-500 font-normal text-base">({animal.name})</span>
                        </h3>
                    </div>
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-medium w-fit">
                      Focus: {animal.focus}
                    </div>
                 </div>
                 
                 <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                    <h4 className="font-semibold text-stone-800 mb-1 flex items-center gap-2 text-sm">
                      <AlertCircle size={14} className="text-amber-600"/> 
                      Management Tips
                    </h4>
                    <p className="text-stone-600 text-sm">{animal.tips}</p>
                 </div>
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
    tmk: '',
    acreage: '',
    zoning: '',
    soil: '',
    water: '',
    goals: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;
        setFormData(prev => ({ ...prev, location: coords }));
        setLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please check permissions.");
        setLocating(false);
      }
    );
  };

  const generatePlan = async () => {
    if (!formData.goals || !formData.location) {
      alert("Please provide at least a location and goals.");
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `
        Create a basic farm plan for:
        Location: ${formData.location}
        TMK: ${formData.tmk}
        Size: ${formData.acreage} acres
        Zoning: ${formData.zoning}
        Water Access: ${formData.water}
        Goals: ${formData.goals}
        
        Please provide:
        1. A suggested layout text description.
        2. Recommended crops/livestock for this specific context.
        3. Immediate next steps.
      `;
      
      const history = [{ id: 'sys', role: 'model' as const, content: AINA_SYSTEM_PROMPT, timestamp: Date.now() }];
      const response = await sendMessageToAinaMind(history, prompt);
      setPlan(response);
    } catch (e) {
      console.error(e);
      setPlan("Sorry, I couldn't generate a plan right now. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">Hoʻolālā (Farm Planning)</h2>
          <p className="text-stone-600">Draft your vision using site-specific data.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Location / Ahupuaʻa</label>
                   <div className="flex gap-2">
                     <input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Waimea, Hawaiʻi"
                        className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                     />
                     <button 
                        onClick={handleGeolocation}
                        className="px-3 py-2 bg-stone-100 text-emerald-700 rounded-lg hover:bg-stone-200 transition-colors"
                        title="Use Current Location"
                     >
                        {locating ? <Loader2 className="animate-spin" size={20}/> : <MapPin size={20}/>}
                     </button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-stone-700 mb-1">TMK (Optional)</label>
                     <input 
                        name="tmk"
                        value={formData.tmk}
                        onChange={handleInputChange}
                        placeholder="e.g. 3-1-..."
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-stone-700 mb-1">Acreage</label>
                     <div className="relative">
                       <Ruler className="absolute left-3 top-2.5 text-stone-400" size={16}/>
                       <input 
                          name="acreage"
                          value={formData.acreage}
                          onChange={handleInputChange}
                          placeholder="2.5"
                          className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                       />
                     </div>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Zoning / Land Use</label>
                   <select 
                      name="zoning"
                      value={formData.zoning}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                   >
                      <option value="">Select Zoning...</option>
                      <option value="Ag-5">Agricultural (Ag-5)</option>
                      <option value="Ag-20">Agricultural (Ag-20)</option>
                      <option value="Residential">Residential</option>
                      <option value="Conservation">Conservation</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Water Source</label>
                   <select 
                      name="water"
                      value={formData.water}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                   >
                      <option value="">Select Water Access...</option>
                      <option value="County Water">County Water</option>
                      <option value="Catchment">Rain Catchment</option>
                      <option value="Stream/Ditch">Stream / Irrigation Ditch</option>
                      <option value="None">None / Hauling</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Goals & Vision</label>
                   <textarea 
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      placeholder="e.g. I want to grow kalo for my family and raise some sheep for meat."
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                   />
                </div>

                <button 
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full bg-emerald-800 text-white py-3 rounded-lg font-bold hover:bg-emerald-900 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                   {isGenerating ? (
                     <>
                       <Loader2 className="animate-spin" size={20}/> Generating Plan...
                     </>
                   ) : (
                     <>
                       <Sprout size={20}/> Generate Farm Plan
                     </>
                   )}
                </button>
             </div>
          </div>

          {/* Result */}
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 h-full overflow-y-auto">
             {plan ? (
               <div className="prose prose-emerald max-w-none">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <FileText size={20}/> Suggested Plan
                  </h3>
                  <div className="whitespace-pre-wrap text-stone-800 leading-relaxed">
                    {plan}
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-200">
                    <button onClick={() => setPlan(null)} className="text-sm text-emerald-700 hover:underline flex items-center gap-1">
                      <RefreshCw size={14}/> Start Over
                    </button>
                  </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-emerald-800/50 text-center p-8">
                  <Map size={48} className="mb-4 opacity-50"/>
                  <p className="font-medium">Enter your property details to generate a custom farm plan.</p>
               </div>
             )}
          </div>
        </div>

        {/* GIS & Maps Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mt-8">
           <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
             <Layers size={24} className="text-emerald-600"/> 
             Nā Palapala ʻĀina (GIS & Maps)
           </h3>
           <p className="text-stone-600 mb-6 text-sm">
             Access official government mapping tools to verify TMK, zoning classifications (Ag-5, Ag-20, etc.), flood zones, and soil composition.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <a 
                href="https://geoportal.hawaiicounty.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              >
                 <div className="bg-emerald-100 p-3 rounded-lg text-emerald-800 group-hover:bg-emerald-200 transition-colors">
                    <Map size={24} />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                       Hawaiʻi County GIS <ExternalLink size={14} className="text-stone-400"/>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">Official county zoning, parcels, and infrastructure maps.</p>
                 </div>
              </a>

              <a 
                href="http://gis.hawaiinfip.org/fhat/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                 <div className="bg-blue-100 p-3 rounded-lg text-blue-800 group-hover:bg-blue-200 transition-colors">
                    <Droplets size={24} />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                       Flood Hazard Tool <ExternalLink size={14} className="text-stone-400"/>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">State of Hawaiʻi Flood Hazard Assessment Tool (FHAT).</p>
                 </div>
              </a>

              <a 
                href="https://kipukadatabase.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50 transition-all group"
              >
                 <div className="bg-amber-100 p-3 rounded-lg text-amber-800 group-hover:bg-amber-200 transition-colors">
                    <Mountain size={24} />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                       Kīpuka Database <ExternalLink size={14} className="text-stone-400"/>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">OHA's database of land awards, ahupuaʻa, and historic sites.</p>
                 </div>
              </a>

              <a 
                href="https://websoilsurvey.sc.egov.usda.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 hover:border-stone-500 hover:bg-stone-50 transition-all group"
              >
                 <div className="bg-stone-200 p-3 rounded-lg text-stone-700 group-hover:bg-stone-300 transition-colors">
                    <Sprout size={24} />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                       USDA Web Soil Survey <ExternalLink size={14} className="text-stone-400"/>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">Detailed soil composition and capability data.</p>
                 </div>
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

interface LaauViewProps {
  data: Record<string, LaauPlant[]>;
  onUpdateData: (data: Record<string, LaauPlant[]>) => void;
}

export const LaauView: React.FC<LaauViewProps> = ({ data, onUpdateData }) => {
  const [activeCategory, setActiveCategory] = useState<string>('respiratory');
  const [showForm, setShowForm] = useState(false);
  
  // New Plant Form State
  const [newPlant, setNewPlant] = useState<Partial<LaauPlant>>({
    use: { hawaiian: '', english: '' },
    preparation: { hawaiian: '', english: '' }
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };
  
  const handleExistingImageUpdate = (category: string, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      
      const newList = [...(data[category] || [])];
      newList[index] = { ...newList[index], imageUrl: url };
      onUpdateData({ ...data, [category]: newList });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlant.hawaiianName && newPlant.plant) {
      const plantToAdd: LaauPlant = {
        hawaiianName: newPlant.hawaiianName,
        plant: newPlant.plant,
        type: newPlant.type || 'Plant',
        use: {
          hawaiian: newPlant.use?.hawaiian || '',
          english: newPlant.use?.english || ''
        },
        preparation: {
          hawaiian: newPlant.preparation?.hawaiian || '',
          english: newPlant.preparation?.english || ''
        },
        growsAbundantly: newPlant.growsAbundantly || '',
        howToGrow: newPlant.howToGrow || '',
        imageUrl: imagePreview || undefined
      };

      onUpdateData({
        ...data,
        [activeCategory]: [...(data[activeCategory] || []), plantToAdd]
      });

      setShowForm(false);
      setNewPlant({ use: { hawaiian: '', english: '' }, preparation: { hawaiian: '', english: '' } });
      setImagePreview(null);
    }
  };

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
               <HeartPulse className="text-emerald-600" />
               Lāʻau Lapaʻau (Medicinal Plants)
            </h2>
            <p className="text-stone-600">Traditional Hawaiian healing plants and their uses.</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-md flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Plant
          </button>
        </header>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {Object.keys(data).map(cat => (
             <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize border
                  ${activeCategory === cat 
                    ? 'bg-emerald-800 text-white border-emerald-800' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}
                `}
             >
               {cat}
             </button>
          ))}
        </div>

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 flex items-start gap-3">
            <AlertCircle className="flex-shrink-0 mt-0.5" size={16} />
            <p><strong>Disclaimer:</strong> This information is for educational purposes only. Always consult a cultural practitioner or medical professional before use.</p>
        </div>

        {/* Form Modal */}
        {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-stone-900">Add to {activeCategory}</h3>
                   <button onClick={() => { setShowForm(false); setImagePreview(null); }} className="text-stone-400 hover:text-stone-600">
                     <X size={24} />
                   </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Hawaiian Name</label>
                            <input 
                                required
                                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={newPlant.hawaiianName || ''}
                                onChange={e => setNewPlant(prev => ({...prev, hawaiianName: e.target.value}))}
                                placeholder="e.g. ʻUhaloa"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Common/English Name</label>
                            <input 
                                required
                                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={newPlant.plant || ''}
                                onChange={e => setNewPlant(prev => ({...prev, plant: e.target.value}))}
                                placeholder="e.g. Waltheria indica"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Type</label>
                         <input 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newPlant.type || ''}
                            onChange={e => setNewPlant(prev => ({...prev, type: e.target.value}))}
                            placeholder="e.g. Shrub, Tree, Herb"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                             <h4 className="font-bold text-emerald-800 text-sm border-b border-emerald-100 pb-1">Usage</h4>
                             <div>
                                <label className="block text-xs font-medium text-stone-600 mb-1">Hawaiian</label>
                                <textarea 
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    rows={2}
                                    value={newPlant.use?.hawaiian || ''}
                                    onChange={e => setNewPlant(prev => ({
                                        ...prev, 
                                        use: { hawaiian: e.target.value, english: prev.use?.english || '' }
                                    }))}
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-medium text-stone-600 mb-1">English</label>
                                <textarea 
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    rows={2}
                                    value={newPlant.use?.english || ''}
                                    onChange={e => setNewPlant(prev => ({
                                        ...prev, 
                                        use: { hawaiian: prev.use?.hawaiian || '', english: e.target.value }
                                    }))}
                                />
                             </div>
                        </div>

                         <div className="space-y-3">
                             <h4 className="font-bold text-emerald-800 text-sm border-b border-emerald-100 pb-1">Preparation</h4>
                             <div>
                                <label className="block text-xs font-medium text-stone-600 mb-1">Hawaiian</label>
                                <textarea 
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    rows={2}
                                    value={newPlant.preparation?.hawaiian || ''}
                                    onChange={e => setNewPlant(prev => ({
                                        ...prev, 
                                        preparation: { hawaiian: e.target.value, english: prev.preparation?.english || '' }
                                    }))}
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-medium text-stone-600 mb-1">English</label>
                                <textarea 
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    rows={2}
                                    value={newPlant.preparation?.english || ''}
                                    onChange={e => setNewPlant(prev => ({
                                        ...prev, 
                                        preparation: { hawaiian: prev.preparation?.hawaiian || '', english: e.target.value }
                                    }))}
                                />
                             </div>
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-stone-700 mb-1">Habitat (Grows Abundantly)</label>
                             <input 
                                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={newPlant.growsAbundantly || ''}
                                onChange={e => setNewPlant(prev => ({...prev, growsAbundantly: e.target.value}))}
                            />
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-stone-700 mb-1">Cultivation (How to Grow)</label>
                             <input 
                                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={newPlant.howToGrow || ''}
                                onChange={e => setNewPlant(prev => ({...prev, howToGrow: e.target.value}))}
                            />
                        </div>
                     </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Photo</label>
                      <div className="flex items-center gap-4">
                        <input 
                           type="file" 
                           id="laau-image-upload" 
                           accept="image/*" 
                           className="hidden"
                           onChange={handleImageSelect}
                        />
                        {!imagePreview ? (
                           <label 
                              htmlFor="laau-image-upload" 
                              className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 rounded-lg cursor-pointer hover:bg-stone-200 transition-colors text-sm font-medium border border-stone-300"
                           >
                              <Camera size={18} /> Add Photo
                           </label>
                        ) : (
                           <div className="relative rounded-lg overflow-hidden border border-stone-200 h-40 w-full bg-stone-100">
                              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                              <button 
                                 type="button" 
                                 onClick={() => setImagePreview(null)}
                                 className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/80"
                              >
                                 <X size={16} />
                              </button>
                           </div>
                        )}
                      </div>
                   </div>

                    <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors">
                      Add Plant
                   </button>
                </form>
             </div>
            </div>
        )}

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data[activeCategory] || []).map((plant, idx) => (
             <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden group">
                {plant.imageUrl ? (
                   <div className="h-48 relative">
                      <img src={plant.imageUrl} alt={plant.plant} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-white text-xl font-bold">{plant.hawaiianName}</h3>
                        <p className="text-emerald-100 text-sm">{plant.plant} • {plant.type}</p>
                      </div>
                       {/* Upload Overlay */}
                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <label className="cursor-pointer bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm flex items-center justify-center">
                            <Camera size={18} />
                             <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => handleExistingImageUpdate(activeCategory, idx, e)}
                             />
                         </label>
                       </div>
                   </div>
                ) : (
                    <div className="h-24 bg-emerald-100 flex items-center justify-center relative">
                        <Sprout size={32} className="text-emerald-300" />
                        {/* Upload Overlay for missing image */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                            <label className="cursor-pointer bg-white text-emerald-800 px-3 py-1 rounded-full shadow-sm text-sm font-medium flex items-center gap-1">
                                <Camera size={14} /> Add Photo
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden"
                                    onChange={(e) => handleExistingImageUpdate(activeCategory, idx, e)}
                                />
                            </label>
                         </div>
                    </div>
                )}
                <div className="p-6 space-y-4">
                   <div>
                     <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2">
                       <Activity size={16} /> Use
                     </h4>
                     <p className="text-stone-600 text-sm italic mb-1">{plant.use.hawaiian}</p>
                     <p className="text-stone-800 text-sm">{plant.use.english}</p>
                   </div>
                   
                   <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                     <h4 className="font-bold text-emerald-900 mb-1 text-sm flex items-center gap-2">
                       <Dumbbell size={14} /> Preparation
                     </h4>
                     <p className="text-stone-600 text-xs italic">{plant.preparation.hawaiian}</p>
                     <p className="text-stone-800 text-xs">{plant.preparation.english}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="block font-bold text-stone-500 mb-1">Habitat</span>
                        <span className="text-stone-800">{plant.growsAbundantly}</span>
                      </div>
                      <div>
                        <span className="block font-bold text-stone-500 mb-1">Cultivation</span>
                        <span className="text-stone-800">{plant.howToGrow}</span>
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

export const AboutView: React.FC = () => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-3xl mx-auto text-center space-y-8">
         <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-emerald-900 rounded-full flex items-center justify-center text-emerald-50 shadow-xl">
               <Sprout size={48} />
            </div>
         </div>
         
         <div>
           <h2 className="text-4xl font-bold text-emerald-950 mb-4">About AinaMind</h2>
           <p className="text-xl text-stone-600 leading-relaxed">
             A bilingual assistant designed to bridge traditional Hawaiian agricultural knowledge with modern farming practices.
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
               <Bot className="text-emerald-600 mb-3" size={32} />
               <h3 className="font-bold text-stone-900 mb-2">AI Powered</h3>
               <p className="text-sm text-stone-600">Uses advanced language models to provide context-aware farming advice.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
               <Map className="text-emerald-600 mb-3" size={32} />
               <h3 className="font-bold text-stone-900 mb-2">Locally Rooted</h3>
               <p className="text-sm text-stone-600">Built specifically for Hawaiʻi's microclimates, soil types, and cultural context.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
               <Shield className="text-emerald-600 mb-3" size={32} />
               <h3 className="font-bold text-stone-900 mb-2">Private & Secure</h3>
               <p className="text-sm text-stone-600">Your farm data stays on your device. We prioritize data sovereignty.</p>
            </div>
         </div>

         <div className="pt-8 border-t border-stone-200">
            <p className="text-sm text-stone-500">
              AinaMind v1.0.0 • Made with Aloha in Hawaiʻi
            </p>
         </div>
      </div>
    </div>
  );
};

export const MarketplaceView: React.FC<{ items: MarketItem[]; onAddItem: (item: MarketItem) => void }> = ({ items, onAddItem }) => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [newItem, setNewItem] = useState<Partial<MarketItem>>({
    category: 'Crops',
    location: 'Hawaiʻi Island'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title && newItem.price) {
      onAddItem({
        id: Date.now().toString(),
        title: newItem.title!,
        category: newItem.category as any,
        price: newItem.price!,
        location: newItem.location || 'Hawaiʻi',
        description: newItem.description || '',
        contact: newItem.contact || '',
        timestamp: Date.now(),
        image: imagePreview || undefined
      });
      setShowForm(false);
      setNewItem({ category: 'Crops', location: 'Hawaiʻi Island' });
      setImagePreview(null);
    }
  };

  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
              <ShoppingBag className="text-emerald-600" />
              Mākeke (Marketplace)
            </h2>
            <p className="text-stone-600">Buy, sell, and trade local agricultural goods.</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-md flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Post Item
          </button>
        </header>

        {/* Filter Bar */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {['All', 'Livestock', 'Crops', 'Solar/Energy', 'Equipment', 'Materials'].map(cat => (
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

        {/* Add Item Modal/Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-stone-900">Post to Mākeke</h3>
                   <button onClick={() => { setShowForm(false); setImagePreview(null); }} className="text-stone-400 hover:text-stone-600">
                     <X size={24} />
                   </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
                     <input 
                        required
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={newItem.title || ''}
                        onChange={e => setNewItem({...newItem, title: e.target.value})}
                        placeholder="e.g. 50lbs Apple Bananas"
                     />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                         <select 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                            value={newItem.category}
                            onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                         >
                            <option value="Livestock">Livestock</option>
                            <option value="Crops">Crops</option>
                            <option value="Solar/Energy">Solar/Energy</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Materials">Materials</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-stone-700 mb-1">Price</label>
                         <input 
                            required
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newItem.price || ''}
                            onChange={e => setNewItem({...newItem, price: e.target.value})}
                            placeholder="$2.00 / lb"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-stone-700 mb-1">Location</label>
                         <input 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newItem.location || ''}
                            onChange={e => setNewItem({...newItem, location: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-stone-700 mb-1">Contact Info</label>
                         <input 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newItem.contact || ''}
                            onChange={e => setNewItem({...newItem, contact: e.target.value})}
                            placeholder="Phone or Email"
                         />
                      </div>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                     <textarea 
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        rows={3}
                        value={newItem.description || ''}
                        onChange={e => setNewItem({...newItem, description: e.target.value})}
                     />
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Photo</label>
                      <div className="flex items-center gap-4">
                        <input 
                           type="file" 
                           id="market-image-upload" 
                           accept="image/*" 
                           className="hidden"
                           onChange={handleImageSelect}
                        />
                        {!imagePreview ? (
                           <label 
                              htmlFor="market-image-upload" 
                              className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 rounded-lg cursor-pointer hover:bg-stone-200 transition-colors text-sm font-medium border border-stone-300"
                           >
                              <Camera size={18} /> Add Photo
                           </label>
                        ) : (
                           <div className="relative rounded-lg overflow-hidden border border-stone-200 h-24 w-24 bg-stone-100">
                              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                              <button 
                                 type="button" 
                                 onClick={() => setImagePreview(null)}
                                 className="absolute top-1 right-1 bg-black/50 text-white p-0.5 rounded-full hover:bg-black/80"
                              >
                                 <X size={14} />
                              </button>
                           </div>
                        )}
                      </div>
                   </div>

                   <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors mt-2">
                      Post Item
                   </button>
                </form>
             </div>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
             <div key={item.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {item.image && (
                   <div className="h-48 relative bg-stone-100 border-b border-stone-100">
                      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                   </div>
                )}
                <div className="p-5 flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-stone-400 text-xs">{new Date(item.timestamp).toLocaleDateString()}</span>
                   </div>
                   <h3 className="font-bold text-lg text-stone-900 mb-1">{item.title}</h3>
                   <div className="flex items-center gap-2 text-stone-900 font-bold text-xl mb-3">
                      <DollarSign size={20} className="text-emerald-600"/> {item.price}
                   </div>
                   <p className="text-stone-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                   
                   <div className="space-y-2 text-sm text-stone-500 mt-auto">
                      <div className="flex items-center gap-2">
                         <MapPin size={16}/> {item.location}
                      </div>
                      <div className="flex items-center gap-2">
                         <Phone size={16}/> {item.contact}
                      </div>
                   </div>
                </div>
                <div className="bg-stone-50 p-3 border-t border-stone-100 flex justify-between items-center">
                   <button className="text-emerald-700 font-medium text-sm hover:underline">View Details</button>
                   <button className="bg-emerald-700 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-emerald-800">Contact</button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BarterView: React.FC<{ items: BarterItem[]; onAddItem: (item: BarterItem) => void }> = ({ items, onAddItem }) => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [newItem, setNewItem] = useState<Partial<BarterItem>>({
    category: 'Produce',
    location: 'Hawaiʻi Island'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title && newItem.lookingFor) {
      onAddItem({
        id: Date.now().toString(),
        title: newItem.title!,
        category: newItem.category as any,
        lookingFor: newItem.lookingFor!,
        location: newItem.location || 'Hawaiʻi',
        description: newItem.description || '',
        contact: newItem.contact || '',
        timestamp: Date.now(),
        image: imagePreview || undefined
      });
      setShowForm(false);
      setNewItem({ category: 'Produce', location: 'Hawaiʻi Island' });
      setImagePreview(null);
    }
  };

  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
              <ArrowLeftRight className="text-emerald-600" />
              Pānaʻi (Barter)
            </h2>
            <p className="text-stone-600">Exchange goods, services, and aloha. No money needed.</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-md flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Post Trade
          </button>
        </header>

        {/* Filter Bar */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {['All', 'Livestock', 'Produce', 'Labor', 'Equipment', 'Materials'].map(cat => (
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

        {/* Add Item Modal/Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-stone-900">Post a Trade</h3>
                   <button onClick={() => { setShowForm(false); setImagePreview(null); }} className="text-stone-400 hover:text-stone-600">
                     <X size={24} />
                   </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-stone-700 mb-1">What You Have (Offer)</label>
                     <input 
                        required
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={newItem.title || ''}
                        onChange={e => setNewItem({...newItem, title: e.target.value})}
                        placeholder="e.g. 20lbs Sweet Potatoes"
                     />
                   </div>
                   
                   <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                      <select 
                         className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                         value={newItem.category}
                         onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                      >
                         <option value="Livestock">Livestock</option>
                         <option value="Produce">Produce</option>
                         <option value="Labor">Labor/Help</option>
                         <option value="Equipment">Equipment</option>
                         <option value="Materials">Materials</option>
                      </select>
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-emerald-800 mb-1">What You Want (Request)</label>
                      <input 
                         required
                         className="w-full px-3 py-2 border-2 border-emerald-100 bg-emerald-50/50 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                         value={newItem.lookingFor || ''}
                         onChange={e => setNewItem({...newItem, lookingFor: e.target.value})}
                         placeholder="e.g. Manure, Labor, or Fish"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-stone-700 mb-1">Location</label>
                         <input 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newItem.location || ''}
                            onChange={e => setNewItem({...newItem, location: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-stone-700 mb-1">Contact Info</label>
                         <input 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newItem.contact || ''}
                            onChange={e => setNewItem({...newItem, contact: e.target.value})}
                            placeholder="Phone or Email"
                         />
                      </div>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                     <textarea 
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        rows={3}
                        value={newItem.description || ''}
                        onChange={e => setNewItem({...newItem, description: e.target.value})}
                     />
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Photo</label>
                      <div className="flex items-center gap-4">
                        <input 
                           type="file" 
                           id="barter-image-upload" 
                           accept="image/*" 
                           className="hidden"
                           onChange={handleImageSelect}
                        />
                        {!imagePreview ? (
                           <label 
                              htmlFor="barter-image-upload" 
                              className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 rounded-lg cursor-pointer hover:bg-stone-200 transition-colors text-sm font-medium border border-stone-300"
                           >
                              <Camera size={18} /> Add Photo
                           </label>
                        ) : (
                           <div className="relative rounded-lg overflow-hidden border border-stone-200 h-24 w-24 bg-stone-100">
                              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                              <button 
                                 type="button" 
                                 onClick={() => setImagePreview(null)}
                                 className="absolute top-1 right-1 bg-black/50 text-white p-0.5 rounded-full hover:bg-black/80"
                              >
                                 <X size={14} />
                              </button>
                           </div>
                        )}
                      </div>
                   </div>

                   <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors mt-2">
                      Post Trade
                   </button>
                </form>
             </div>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
             <div key={item.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {item.image && (
                   <div className="h-48 relative bg-stone-100 border-b border-stone-100">
                      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                   </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-stone-400 text-xs">{new Date(item.timestamp).toLocaleDateString()}</span>
                   </div>
                   
                   <div className="mb-4">
                      <p className="text-xs text-stone-500 uppercase font-bold mb-1">Have</p>
                      <h3 className="font-bold text-lg text-stone-900 leading-tight">{item.title}</h3>
                   </div>

                   <div className="mb-4 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                      <p className="text-xs text-emerald-700 uppercase font-bold mb-1 flex items-center gap-1">
                        <Repeat size={12}/> Wants
                      </p>
                      <p className="font-medium text-emerald-900">{item.lookingFor}</p>
                   </div>

                   <p className="text-stone-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                   
                   <div className="space-y-2 text-sm text-stone-500 mt-auto pt-2">
                      <div className="flex items-center gap-2">
                         <MapPin size={16}/> {item.location}
                      </div>
                   </div>
                </div>
                <div className="bg-stone-50 p-3 border-t border-stone-100 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-stone-600 text-sm">
                      <Phone size={14}/> 
                      <span className="truncate max-w-[120px]">{item.contact}</span>
                   </div>
                   <button className="bg-emerald-700 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-emerald-800">
                     Trade
                   </button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
