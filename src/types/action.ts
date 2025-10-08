export type ActionCategory = 
  | 'transportation'
  | 'energy'
  | 'waste'
  | 'water'
  | 'food'
  | 'shopping'
  | 'lifestyle'
  | 'community';

export interface EcoAction {
  $id: string;
  userId: string;
  category: ActionCategory;
  title: string;
  description: string;
  points: number;
  carbonSaved: number; // kg CO2
  waterSaved?: number; // liters
  wasteReduced?: number; // kg
  timestamp: string;
  verified: boolean;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  metadata?: Record<string, any>;
}

export interface ActionTemplate {
  $id: string;
  category: ActionCategory;
  title: string;
  description: string;
  points: number;
  carbonSaved: number;
  waterSaved?: number;
  wasteReduced?: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // minutes
  requirements?: string[];
  tips?: string[];
}

export interface ActionLog {
  actionId: string;
  userId: string;
  timestamp: string;
  quantity?: number;
  notes?: string;
  photos?: string[];
  verified: boolean;
}

export interface ActionStats {
  totalActions: number;
  actionsByCategory: Record<ActionCategory, number>;
  totalPoints: number;
  totalCarbonSaved: number;
  totalWaterSaved: number;
  totalWasteReduced: number;
  averageActionsPerDay: number;
  streak: number;
}
