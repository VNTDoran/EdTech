import { User } from './user';

export interface Comment {
  id: number;
  content: string;
  creationDate: Date;
  user: User;
  postId: number;
}
