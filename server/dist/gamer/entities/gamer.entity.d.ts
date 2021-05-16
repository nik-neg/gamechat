import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Message } from 'src/message/entities/message.entity';
export declare class Gamer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    language: string;
    avatar: string;
    notifications: Array<Message>;
    favouriteGameChats: Array<{
        id: number;
    }>;
    isAdmin: boolean;
    messages: Message[];
    gameChatRoom: Gamechatroom[];
}
