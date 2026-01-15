import { CropInfo, LivestockInfo, MarketItem, LaauPlant, CommunityPost } from './types';

export const LAAU_DATA: Record<string, LaauPlant[]> = {
  respiratory: [
    {
      plant: "Uhaloa",
      hawaiianName: "ʻUhaloa",
      type: "Shrub",
      use: {
        hawaiian: "Hoʻomaha i ka ʻāʻī a kōkua i ka hanu",
        english: "Soothes throat and supports respiratory comfort"
      },
      preparation: {
        hawaiian: "Hoʻowali i ke aʻa i loko o ka wai wela a inu i ka wai",
        english: "Boil roots into a mild tea or chew traditionally"
      },
      growsAbundantly: "Dry to mesic lowlands across all major Hawaiian islands",
      howToGrow: "Full sun, tolerates poor soil, grows easily from cuttings"
    },
    {
      plant: "Laukahi",
      hawaiianName: "Laukahi",
      type: "Herb",
      use: {
        hawaiian: "Kōkua i ka hanu a hoʻōla i ka ʻeha o ka ʻāʻī",
        english: "Supports breathing ease and throat comfort"
      },
      preparation: {
        hawaiian: "Hoʻowali i nā lau i loko o ka wai wela; hoʻohana ʻia ma ke ʻano he poultice",
        english: "Leaves steeped as tea; crushed leaves used as poultice"
      },
      growsAbundantly: "Roadsides, disturbed soils, wet and dry areas statewide",
      howToGrow: "Moist soil, partial shade to full sun, grows easily from seed"
    }
  ],
  digestive: [
    {
      plant: "ʻOlena",
      hawaiianName: "ʻOlena",
      type: "Rhizome",
      use: {
        hawaiian: "Hoʻonāwaliwali i ka ʻeha o loko a kōkua i ka naʻau",
        english: "Supports digestion and reduces internal discomfort"
      },
      preparation: {
        hawaiian: "Kuʻi a wili i ka ʻolena i loko o ka wai wela",
        english: "Grate rhizome into tea or warm infusions"
      },
      growsAbundantly: "Wet, shaded areas of Hawaiʻi Island, Maui, Kauaʻi",
      howToGrow: "Plant rhizomes in rich moist soil, partial shade, harvest after 8–10 months"
    },
    {
      plant: "Noni",
      hawaiianName: "Noni",
      type: "Tree",
      use: {
        hawaiian: "Kōkua i ka naʻau a hoʻoikaika i ke kino",
        english: "Supports gut health and general wellness"
      },
      preparation: {
        hawaiian: "Hoʻohana ʻia ka hua i ka wai noni; hoʻohana ʻia nā lau i ka wai wela",
        english: "Fruit fermented or juiced; leaves used in warm infusions"
      },
      growsAbundantly: "Coastal areas and lowlands across all islands",
      howToGrow: "Full sun, drought tolerant, thrives in sandy or rocky soil"
    }
  ],
  circulatory: [
    {
      plant: "Mamaki",
      hawaiianName: "Māmaki",
      type: "Shrub/Tree",
      use: {
        hawaiian: "Hoʻoulu i ke kahe koko a hoʻoikaika i ke kino",
        english: "Supports circulation and overall vitality"
      },
      preparation: {
        hawaiian: "Hoʻomaloʻo i nā lau a kuke i loko o ka wai",
        english: "Dry leaves and brew as tea"
      },
      growsAbundantly: "Native forests of Hawaiʻi Island and Maui",
      howToGrow: "Partial shade, moist well‑drained soil, protect from wind"
    },
    {
      plant: "Ko",
      hawaiianName: "Kō",
      type: "Grass",
      use: {
        hawaiian: "Hoʻoulu i ka ikehu a kōkua i ka wai o ke kino",
        english: "Traditionally used to support energy and hydration"
      },
      preparation: {
        hawaiian: "ʻOmi i ka kō e loaʻa ai ka wai",
        english: "Juice extracted from stalk; added to herbal teas"
      },
      growsAbundantly: "Lowland agricultural zones statewide",
      howToGrow: "Plant cuttings, full sun, moderate watering, harvest in 12–18 months"
    }
  ],
  musculoskeletal: [
    {
      plant: "ʻAwa",
      hawaiianName: "ʻAwa",
      type: "Shrub",
      use: {
        hawaiian: "Hoʻomaha i nā ʻiʻo a hoʻoikaika i ka noʻonoʻo",
        english: "Supports muscle relaxation and grounding"
      },
      preparation: {
        hawaiian: "Kuʻi i ke aʻa a kānana i ka wai",
        english: "Pound roots and strain into traditional drink"
      },
      growsAbundantly: "Humid, shaded valleys of Hawaiʻi Island and Puna",
      howToGrow: "Shade, high humidity, rich soil, consistent water, harvest after 2–3 years"
    },
    {
      plant: "Kukui",
      hawaiianName: "Kukui",
      type: "Tree",
      use: {
        hawaiian: "Hoʻohana ʻia ka ʻaila no ka lomilomi a me ka hoʻōla ʻiʻo",
        english: "Oil used for massage and soothing muscles"
      },
      preparation: {
        hawaiian: "ʻOmi ʻia nā nuku no ka ʻaila; hoʻohana ʻia nā lau i ka wela",
        english: "Nuts pressed for oil; leaves used in warm compresses"
      },
      growsAbundantly: "Dry to mesic forests across all islands",
      howToGrow: "Full sun, drought tolerant, grows quickly from seed"
    }
  ],
  skin: [
    {
      plant: "Aloe",
      hawaiianName: "Aloe",
      type: "Succulent",
      use: {
        hawaiian: "Hoʻomaha i ka ʻili a kōkua i ka ʻeha",
        english: "Soothes skin and supports healing"
      },
      preparation: {
        hawaiian: "Hoʻohana pololei i ka gel mai ka lau",
        english: "Apply gel directly from leaf"
      },
      growsAbundantly: "Dry, sunny areas statewide",
      howToGrow: "Full sun, sandy soil, minimal watering"
    },
    {
      plant: "Kī",
      hawaiianName: "Kī",
      type: "Shrub",
      use: {
        hawaiian: "Hoʻohana ʻia no ka hoʻomaʻemaʻe a me nā ʻili ʻeha",
        english: "Used for cleansing, protection, and soothing wraps"
      },
      preparation: {
        hawaiian: "Hoʻomehana i nā lau a wahī ma luna o ke kino",
        english: "Warm leaves and apply externally"
      },
      growsAbundantly: "Wet and mesic areas across all islands",
      howToGrow: "Plant cuttings, moist soil, partial shade to full sun"
    }
  ]
};

export const AINA_SYSTEM_PROMPT = `
ROLE:
You are AinaMind, a bilingual (ʻŌlelo Hawaiʻi and English) farm and land stewardship assistant designed for Hawaiʻi. You support small and mid‑scale farmers, ranchers, and landowners with practical, grounded, and culturally respectful guidance.

You also support Lāʻau Lapaʻau knowledge (Medicinal Plants).
Use the following REFERENCE DATA when answering questions about medicinal plants.
DO NOT invent uses. Use only the provided data or general well-known botanical knowledge.
DO NOT give medical advice, diagnosis, or prescriptions. Always include a disclaimer.

REFERENCE DATA (Lāʻau Lapaʻau):
- Respiratory: ʻUhaloa (Soothes throat), Laukahi (Breathing ease)
- Digestive: ʻOlena (Digestion/Inflammation), Noni (Gut health/General)
- Circulatory: Māmaki (Circulation/Vitality), Kō (Energy/Hydration)
- Musculoskeletal: ʻAwa (Relaxation), Kukui (Massage/Oil)
- Skin: Aloe (Soothing), Kī (Cleansing/Wraps)

--------------------------------------------------
You always respond in TWO SECTIONS:

1) ʻŌlelo Hawaiʻi:
- Clear, respectful, and rooted in Hawaiian values and worldview.
- Not a word‑for‑word translation — speak naturally, like a kupuna or trusted kiaʻi ʻāina explaining with care.
- Use simple, accessible Hawaiian unless the user clearly prefers more advanced language.
- If property or grant data is present, reference it directly.

2) English:
- Direct, practical, and aligned with the Hawaiian meaning.
- Focus on clear steps, options, and tradeoffs.
- If property or grant data is present, reference it directly.

Label them clearly:

ʻŌlelo Hawaiʻi:
[Hawaiian response]

English:
[English response]

--------------------------------------------------
CONTEXT ABOUT THE USER (EXAMPLE FARMER PROFILE):
- Location: Hawaiʻi Island
- Scale: ~2 acres diversified
- Focus: kalo, orchard, pasture, sheep, cattle, layers, gamefowl (for manure), compost, regenerative practices
- Goals: regenerative, closed‑loop system, practical income, long‑term soil health, alignment with local values.

--------------------------------------------------
CORE DOMAINS YOU SUPPORT:

1) Crop Management (Hawaiʻi‑specific)
- Help choose crops and varieties suited to:
  - Island, elevation, rainfall, wind, soil type, water access.
- Provide:
  - Planting windows and seasons.
  - Spacing, days to maturity, succession planting ideas.
  - Irrigation guidance (hand‑watering, drip, rain catchment).
  - Fertility guidance (compost, manure, cover crops, mulching).
  - Pest and disease awareness and prevention (no chemical recipes).
  - Harvest timing and post‑harvest handling basics.
- Emphasize:
  - Kalo, ʻulu, maiʻa, ʻuala, greens, herbs, orchard crops, windbreaks, cover crops.

2) Livestock Management
- Species to support:
  - Cattle, sheep, goats, chickens (layers and broilers), gamefowl.
- Provide:
  - Basic housing and space guidelines.
  - Pasture rotation concepts (rest periods, avoiding overgrazing).
  - Feed planning (pasture + supplemental feed, kitchen scraps where appropriate).
  - Manure handling and compost integration.
  - General health awareness (signs of stress, parasites, injury) — but never diagnose or prescribe medication.
- Emphasize:
  - Integration of livestock into soil building and farm systems.
  - Humane, respectful treatment.

3) Property & TMK Awareness
- If the app provides TMK, zoning, acreage, or land use data, use it to tailor guidance.
- Consider:
  - Whether the land is in an Agricultural District or other classification.
  - How size, zoning, and land use might affect what is realistic on the property.
- You DO NOT give legal or tax advice. If the user asks about taxes, exemptions, or legal use, explain concepts in general terms and tell them to confirm with the County Real Property Tax Office, Land Use Commission, or a professional.

4) Grants & Incentives
- Use any grant records the app provides to:
  - Suggest which programs might align with the user’s goals.
  - Help them organize their story, conservation goals, and basic project descriptions.
- You DO NOT invent specific grant names, deadlines, or guarantee eligibility. If unsure, say so and suggest they check official sources or local organizations (e.g., Hawaiʻi Farm Bureau, NRCS, County programs).

5) Farm & Land Planning
- Help design:
  - Simple layouts for small farms (zones, fields, paddocks, orchards, windbreaks, compost areas).
  - Water flow awareness (drainage, erosion risk, catchment opportunities).
  - Daily/weekly task lists based on their crops and livestock.
  - Long‑term soil improvement strategies (mulch, compost, cover crops, reduced tillage).
- Provide:
  - Text‑based “maps” and plans the user can visualize.
  - Step‑by‑step suggestions, not rigid prescriptions.

6) Tasks & Next Actions
- Whenever possible, end with:
  - A short list of concrete next steps the user can take.
  - Prioritized: “Start with this today / this week / this month.”

--------------------------------------------------
SAFETY & BOUNDARIES (VERY IMPORTANT):
- You DO NOT:
  - Diagnose medical conditions (human or animal).
  - Prescribe medications, doses, or treatments.
  - Provide chemical pesticide or herbicide recipes.
  - Give legal, financial, or tax advice.
- If the user asks for these, say you cannot provide that and gently redirect to:
  - Veterinarians, agronomists, extension agents, financial advisors, or official agencies.

--------------------------------------------------
TONE & STYLE:
- Grounded, calm, and encouraging.
- Respectful of Hawaiian culture and ʻāina.
- Practical and realistic — acknowledge tradeoffs (time, money, labor, risk).
- Avoid shaming. If something is risky or not ideal, explain why and offer safer or more sustainable alternatives.

--------------------------------------------------
RESPONSE FORMAT (ALWAYS):

1) ʻŌlelo Hawaiʻi:
- 1–3 short paragraphs.
- Use clear, respectful language.
- Include at least one value or principle when appropriate (e.g., mālama ʻāina, laulima, ahonui).

2) English:
- 1–4 short paragraphs.
- Focus on:
  - What to consider.
  - Options.
  - Concrete next steps.

3) Optional: Bullet list of “Next Actions” in English only, if helpful.
`;

export const REFERENCE_CROPS: CropInfo[] = [
  {
    name: "Taro",
    hawaiianName: "Kalo",
    description: "The staple of the Hawaiian diet. Needs consistent moisture and dedication.",
    plantingSeason: "Year-round (check moon phases)",
    waterNeeds: "High (lo'i) or Moderate (mala)"
  },
  {
    name: "Breadfruit",
    hawaiianName: "ʻUlu",
    description: "A resilient starch crop and canopy tree. Excellent for food security.",
    plantingSeason: "Rainy season",
    waterNeeds: "Moderate"
  },
  {
    name: "Sweet Potato",
    hawaiianName: "ʻUala",
    description: "Fast-growing ground cover and starch. Good for drier zones.",
    plantingSeason: "Year-round",
    waterNeeds: "Low to Moderate"
  },
  {
    name: "Banana",
    hawaiianName: "Maiʻa",
    description: "Fast growing fruit and windbreak. Heavy feeder.",
    plantingSeason: "Year-round",
    waterNeeds: "Moderate to High"
  }
];

export const REFERENCE_LIVESTOCK: LivestockInfo[] = [
  {
    name: "Cattle",
    hawaiianName: "Pipi",
    focus: "Grazing, Meat, Milk",
    tips: "Requires significant space and robust fencing. Essential for large-scale grass management."
  },
  {
    name: "Horse",
    hawaiianName: "Lio",
    focus: "Work, Recreation, Pasture Mgmt",
    tips: "Needs quality forage and regular hoof care. Good companion grazer with cattle to break parasite cycles."
  },
  {
    name: "Pig",
    hawaiianName: "Puaʻa",
    focus: "Meat, Cultural Ceremonies, Tilling",
    tips: "Requires shade and wallows. Excellent for turning compost or clearing land, but fencing must be strong."
  },
  {
    name: "Goat",
    hawaiianName: "Kao",
    focus: "Brush Clearing, Meat, Milk",
    tips: "Masters of escape; needs very secure fencing. Browsers that prefer shrubs over grass."
  },
  {
    name: "Sheep",
    hawaiianName: "Hipa",
    focus: "Grazing & Meat",
    tips: "Rotate pastures frequently to manage parasites. Good for orchards as they generally don't strip bark like goats."
  },
  {
    name: "Chickens",
    hawaiianName: "Moa",
    focus: "Eggs, Meat, Pest Control",
    tips: "Excellent for sanitizing pastures after larger stock. Protect from predators (mongoose, dogs)."
  },
  {
    name: "Duck",
    hawaiianName: "Kākā",
    focus: "Pest Control (Snails/Slugs), Eggs",
    tips: "Hardy in wet areas. Voracious eaters of garden pests. Needs access to water to keep eyes/nostrils clean."
  }
];

export const INITIAL_MARKET_ITEMS: MarketItem[] = [
  {
    id: '1',
    title: 'St. Croix Ram Lambs',
    category: 'Livestock',
    price: '$300 ea',
    location: 'Waimea',
    description: 'Weaned ram lambs, parasite resistant genetics. Ready for new pastures.',
    contact: '808-555-0101',
    timestamp: Date.now() - 10000000
  },
  {
    id: '2',
    title: 'Huli Kalo (Various Varieties)',
    category: 'Crops',
    price: '$1.00 / huli',
    location: 'Hilo (Keaukaha)',
    description: 'Moi, Lehua, and Bun Long varieties available. Fresh cut.',
    contact: 'aloha@farm.com',
    timestamp: Date.now() - 5000000
  },
  {
    id: '3',
    title: 'Off-Grid Solar Battery Bank (Lead Acid)',
    category: 'Solar/Energy',
    price: '$500',
    location: 'Ocean View (Kaʻū)',
    description: 'Used bank, still holds charge. Good starter for small cabin.',
    contact: '808-555-0123',
    timestamp: Date.now() - 2000000
  },
  {
    id: '4',
    title: 'IBC Totes (Food Grade)',
    category: 'Equipment',
    price: '$150',
    location: 'Kona',
    description: 'Cleaned, 275 gallon totes. Perfect for catchment.',
    contact: 'konafarm@mail.com',
    timestamp: Date.now()
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: 'Uncle Keola',
    location: 'Waimea',
    category: 'Tip',
    content: 'If you planting windbreaks, try include some native shrubs like ʻaʻaliʻi in between. They tough and handle the wind good.',
    likes: 12,
    timestamp: Date.now() - 86400000
  },
  {
    id: '2',
    author: 'Sarah M.',
    location: 'Puna',
    category: 'Observation',
    content: 'My papayas are starting to show signs of ringspot again. Anyone having success with the new resistant varieties?',
    likes: 5,
    timestamp: Date.now() - 172800000
  },
  {
    id: '3',
    author: 'Kaipo',
    location: 'Kona',
    category: 'Success',
    content: 'Finally harvested my first batch of coffee this season. The rain last month really helped the cherry size.',
    likes: 24,
    timestamp: Date.now() - 3600000
  }
];
