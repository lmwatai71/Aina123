export enum AppView {
  CHAT = 'CHAT',
  CROPS = 'CROPS',
  LIVESTOCK = 'LIVESTOCK',
  PLANNING = 'PLANNING',
  SURVEY = 'SURVEY',
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

export interface SurveyInfo {
  category: string;
  title: string;
  description: string;
  steps: string[];
  tips: string[];
}