import FavouriteGameChats from './favouriteGameChats';
import Message from './message';

export default interface Gamer {
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  id: number;
  password?: string;
  avatar?: string;
  notifications?: Message[];
  favouriteGameChats?: FavouriteGameChats[];
  isAdmin?: boolean;
  messages?: number[];
  gameChatRoom?: number[];
}
