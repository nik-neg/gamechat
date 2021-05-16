import FavouriteGameChats from './favouriteGameChats';
import Message from './message';

export default interface Gamer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  notifications?: Message[];
  favouriteGameChats?: FavouriteGameChats[];
  isAdmin?: boolean;
  language: string;
  messages?: number[];
  gameChatRoom?: number[];
}
