
import { Certificate } from './certificate';


export interface Comment {
  id: number;
  username: string;
  text: string;
  certificate?: Certificate|null;
 
}
