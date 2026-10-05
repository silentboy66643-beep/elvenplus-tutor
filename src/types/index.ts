export interface MapSource {
  title: string;
  uri: string;
  address?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  mapSources?: MapSource[];
}

export interface ReviewItem {
  id: string;
  author: string;
  schoolOutcome?: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface ServiceCardItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  skillsCovered: string[];
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
