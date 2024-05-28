import { User } from "./user";
import { Comment } from './comment';

export interface Post {
  id: number;
  content: string;
  user?: User | null;
  likes: User[];  // Add this line
  comments: Comment[];
  showEllipsisMenu?: boolean; // Add this property
  creationDate: string;  // Add this line
}
