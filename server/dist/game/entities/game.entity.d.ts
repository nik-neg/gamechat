import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
export declare class Game {
    id: number;
    apiId: number;
    title: string;
    genreList: Array<{
        id: string;
        name: string;
    }>;
    dominantGenre: {
        id: string;
        name: string;
    };
    releaseDate: string;
    imagesPath: {
        cover: string;
        screenshots: string[];
    };
    consoles: string[];
    ageRating: string;
    description: string;
    gameChatRoom: Gamechatroom;
}
