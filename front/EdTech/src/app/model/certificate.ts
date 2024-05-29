export interface Certificate {
  id: number;
  name: string;
  description: string;
  logoLink: string;
  score: number;
  category: string; // New property for categories
  ratings: number[];
  comments: string[];    // New property for ratings
}