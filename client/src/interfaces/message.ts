import Gamer from './gamer';

export default interface Message {
  id: number;
  content: string;
  isQuestion: boolean;
  gamer: Gamer;
  likes: number;
  liked: boolean;
  translatedContent: { [language: string]: string };
  createdAt: string;
  updatedAt: string;
  gameChatRoom: number[];
}
