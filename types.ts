
export enum AppView {
  CHAT = 'CHAT',
  CROPS = 'CROPS',
  LIVESTOCK = 'LIVESTOCK',
  PLANNING = 'PLANNING',
  MARKETPLACE = 'MARKETPLACE',
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
}

export interface LivestockInfo {
  name: string;
  hawaiianName: string;
  focus: string;
  tips: string;
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
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  bio: string;
  joinedDate: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  location: string;
  category: 'Tip' | 'Observation' | 'Question' | 'Success';
  content: string;
  likes: number;
  timestamp: number;
}
