import { Game } from 'src/game/entities/game.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';
import { Message } from 'src/message/entities/message.entity';
export declare class Gamechatroom {
    id: number;
    notificationAllowed: boolean;
    isPrivate: boolean;
    messagesCount: number;
    game: Game;
    gamer: Gamer[];
    messages: Message[];
}
