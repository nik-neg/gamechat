import Gamechatroom from './gameChatRoom';
import Genre from './genre';
import ImagesPath from './ImagesPath';

export default interface Game {
  id: number;
  apiId: number;
  title: string;
  genreList: Genre[];
  dominantGenre: Genre;
  releaseDate: string;
  imagesPath: ImagesPath;
  consoles: string[];
  ageRating: string;
  description: string;
  gameChatRoom: Gamechatroom;
}
