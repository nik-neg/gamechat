import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';
interface TranslatedContentDictionary {
    [key: string]: string;
}
export declare class Message {
    id: number;
    content: string;
    translatedContent: TranslatedContentDictionary;
    isQuestion: boolean;
    likes: number;
    liked: boolean;
    createdAt: Date;
    updatedAt: Date;
    gamer: Gamer;
    gameChatRoom: Gamechatroom;
}
export {};
