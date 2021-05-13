export default interface Message {
  id: number;
  content: string;
  isQuestion: boolean;
  likes: number;
  liked: boolean;
  translatedContent: string;
  createdAt: string;
  updatedAt: string;
  gamer: number[];
  gameChatRoom: number[];
}
