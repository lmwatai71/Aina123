import { CropInfo, LivestockInfo } from './types';

export const AINA_SYSTEM_PROMPT = `
ROLE:
You are AinaMind, a bilingual (ʻŌlelo Hawaiʻi and English) farm and land stewardship assistant designed for Hawaiʻi. You support small and mid‑scale farmers, ranchers, and landowners with practical, grounded, and culturally respectful guidance.

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
    name: "Sheep",
    hawaiianName: "Hipa",
    focus: "Grazing & Meat",
    tips: "Rotate pastures frequently to manage parasites. Good for orchards."
  },
  {
    name: "Cattle",
    hawaiianName: "Pipi",
    focus: "Grazing, Meat, Milk",
    tips: "Requires significant space and robust fencing. Essential for large-scale grass management."
  },
  {
    name: "Chickens",
    hawaiianName: "Moa",
    focus: "Eggs, Meat, Pest Control, Manure",
    tips: "Excellent for sanitizing pastures after larger stock. Protect from predators."
  }
];

export interface SurveyInfo {
  category: string;
  title: string;
  description: string;
  steps: string[];
  tips: string[];
}

export const REFERENCE_SURVEY: SurveyInfo[] = [
  {
    category: "Property Pins",
    title: "Locating Property Pins",
    description: "Property pins mark the exact boundaries of your land. They are typically metal stakes or concrete monuments placed by surveyors.",
    steps: [
      "Check your property deed or TMK records for existing survey information",
      "Look for metal pins at the corners of your property - they may be buried slightly",
      "Use a metal detector if pins are difficult to find",
      "Contact a licensed surveyor if pins are missing or damaged",
      "Document pin locations with GPS coordinates and photos"
    ],
    tips: [
      "Property pins are often found at the corners of your lot",
      "Look for survey markers that are 1/2\" to 1\" in diameter",
      "Pins may be marked with the surveyor's license number",
      "Keep vegetation cleared around pin locations",
      "Take photos of pins before and after any construction"
    ]
  },
  {
    category: "Property Pins",
    title: "Marking Property Pins",
    description: "Properly marking property pins helps prevent boundary disputes and ensures accurate construction.",
    steps: [
      "Clean the area around each pin to make it visible",
      "Place temporary markers like flags or stakes near pins",
      "Take detailed measurements from pins to permanent structures",
      "Create a property pin map with measurements and landmarks",
      "Consider permanent markers for frequently accessed pins"
    ],
    tips: [
      "Use bright colored flags or tape for temporary marking",
      "Include measurements to nearby roads, buildings, or natural features",
      "Keep your property pin map in a safe, accessible location",
      "Share pin locations with contractors before any work begins",
      "Regularly check and maintain pin markers"
    ]
  },
  {
    category: "Building Codes",
    title: "Hawaii Building Codes Overview",
    description: "Hawaii has specific building codes that vary by island and county. Always consult local authorities for current requirements.",
    steps: [
      "Contact your local county building department for specific codes",
      "Review zoning requirements for your TMK (Tax Map Key)",
      "Check setback requirements from property lines",
      "Verify height restrictions and building coverage limits",
      "Obtain necessary permits before construction begins"
    ],
    tips: [
      "Building codes protect against natural hazards like earthquakes and floods",
      "Agricultural districts may have different requirements than residential",
      "Some islands have additional requirements for coastal properties",
      "Energy efficiency standards are increasingly important",
      "Historic preservation rules may apply in certain areas"
    ]
  },
  {
    category: "Building Codes",
    title: "Agricultural Building Requirements",
    description: "Special considerations for farm buildings, greenhouses, and agricultural structures in Hawaii.",
    steps: [
      "Determine if your structure qualifies as agricultural use",
      "Check county requirements for agricultural buildings",
      "Verify foundation and anchoring requirements",
      "Ensure proper drainage and erosion control",
      "Plan for future expansion and equipment access"
    ],
    tips: [
      "Many counties allow simplified permitting for small agricultural structures",
      "Consider wind resistance for structures in exposed areas",
      "Proper ventilation is crucial in Hawaii's humid climate",
      "Roof design should account for heavy rainfall",
      "Some areas require flood elevation certificates"
    ]
  }
];
