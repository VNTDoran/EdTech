import { User } from './user';

export interface Post {
  title: string;
  content: string;

}

export interface Comment {
  id: number;
  author: User;
  content: string;
}
