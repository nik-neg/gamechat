export default interface Message {
  id: number;
  content: string;
  isQuestion: boolean;
  likes: number;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
  gamer: number[];
  gameChatRoom: number[];
}
