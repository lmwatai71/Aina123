
export enum AppView {
  CHAT = 'CHAT',
  CROPS = 'CROPS',
  LIVESTOCK = 'LIVESTOCK',
  PESTS = 'PESTS',
  PLANNING = 'PLANNING',
  MARKETPLACE = 'MARKETPLACE',
  BARTER = 'BARTER',
  LAAU = 'LAAU',
  COMMUNITY = 'COMMUNITY',
  PROFILE = 'PROFILE',
  ABOUT = 'ABOUT'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface CropInfo {
  name: string;
  hawaiianName: string;
  description: string;
  plantingSeason: string;
  waterNeeds: string;
  imageUrl?: string;
}

export interface LivestockInfo {
  name: string;
  hawaiianName: string;
  focus: string;
  tips: string;
  imageUrl?: string;
}

export interface PestInfo {
  name: string;
  hawaiianName?: string;
  scientificName?: string;
  type: 'Insect' | 'Animal' | 'Fungus' | 'Nematode' | 'Parasite';
  affects: 'Crops' | 'Livestock' | 'Both' | 'Structures';
  description: string;
  management: string;
  prevention: string;
  imageUrl?: string;
}

export interface MarketItem {
  id: string;
  title: string;
  category: 'Livestock' | 'Crops' | 'Solar/Energy' | 'Equipment' | 'Materials';
  price: string;
  location: string;
  description: string;
  contact: string;
  timestamp: number;
  image?: string;
}

export interface BarterItem {
  id: string;
  title: string; // What they have
  category: 'Livestock' | 'Produce' | 'Labor' | 'Equipment' | 'Materials';
  lookingFor: string; // What they want in return
  location: string;
  description: string;
  contact: string;
  timestamp: number;
  image?: string;
}

export interface LaauPlant {
  plant: string;
  hawaiianName: string;
  type: string;
  use: {
    hawaiian: string;
    english: string;
  };
  preparation: {
    hawaiian: string;
    english: string;
  };
  growsAbundantly: string;
  howToGrow: string;
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  bio: string;
  joinedDate: number;
  socialHandles?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export interface CommunityPost {
  id: string;
  author: string;
  location: string;
  category: 'Tip' | 'Observation' | 'Success' | 'Question';
  content: string;
  likes: number;
  timestamp: number;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
}
