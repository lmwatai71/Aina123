import React, { useState } from 'react';
import { Droplets, Calendar, Sun, Info, AlertCircle, MapPin, Ruler, Mountain, Sprout, Loader2, FileText, RefreshCw, Bot } from 'lucide-react';
import { REFERENCE_CROPS, REFERENCE_LIVESTOCK, REFERENCE_SURVEY } from '../constants';
import { sendMessageToAinaMind } from '../services/geminiService';

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

export const SurveyView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Property Pins');

  const categories = [...new Set(REFERENCE_SURVEY.map(item => item.category))];
  const filteredSurveys = REFERENCE_SURVEY.filter(item => item.category === selectedCategory);

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">Ana ʻĀina (Land Survey)</h2>
          <p className="text-stone-600">Tools and guidance for property boundaries, pins, and Hawaii building codes.</p>
        </header>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Survey Items */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {filteredSurveys.map((survey, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-emerald-100/50 p-4 border-b border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900">{survey.title}</h3>
                <p className="text-sm text-emerald-700 mt-1">{survey.category}</p>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-stone-700 leading-relaxed">{survey.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Ruler className="text-emerald-600 mt-0.5" size={16} />
                    <div className="flex-1">
                      <span className="font-semibold text-stone-900 block mb-2">Steps</span>
                      <ol className="list-decimal list-inside text-stone-600 space-y-1 text-sm">
                        {survey.steps.map((step, stepIdx) => (
                          <li key={stepIdx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="text-blue-500 mt-0.5" size={16} />
                    <div className="flex-1">
                      <span className="font-semibold text-stone-900 block mb-2">Tips</span>
                      <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
                        {survey.tips.map((tip, tipIdx) => (
                          <li key={tipIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-amber-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Important Notice</h4>
              <p className="text-amber-800 text-sm">
                This information is for educational purposes only. Always consult with licensed surveyors, 
                local building departments, and legal professionals for official property boundaries, 
                permits, and compliance with Hawaii building codes. Requirements vary by island and county.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};