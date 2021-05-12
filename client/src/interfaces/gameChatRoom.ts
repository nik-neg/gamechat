import Game from './game';

export default interface Gamechatroom {
  id: number;
  notificationAllowed: boolean;
  isPrivate: boolean;
  messagesCount: number;
  game: number[];
  gamer: number[];
  messages: number[];
}
