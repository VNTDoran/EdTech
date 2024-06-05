import { Certificate } from './certificate';

export interface Comment {
  id: number;
  username: string;
  text: string;
  certificate?: Certificate | null;
  editing?: boolean; // Flag to track editing state
  updatedText?: string; // Store the updated content
}
