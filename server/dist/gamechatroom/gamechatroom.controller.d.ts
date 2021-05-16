import { GamechatroomService } from './gamechatroom.service';
import { CreateGamechatroomDto } from './dto/create-gamechatroom.dto';
import { UpdateGamechatroomDto } from './dto/update-gamechatroom.dto';
export declare class GamechatroomController {
    private readonly gamechatroomService;
    constructor(gamechatroomService: GamechatroomService);
    create(createGamechatroomDto: CreateGamechatroomDto, gamerId: string): Promise<import("./entities/gamechatroom.entity").Gamechatroom>;
    findAll(gamerId: string, userLang: string): void;
    findOne(id: string): Promise<import("./entities/gamechatroom.entity").Gamechatroom>;
    update(id: string, updateGamechatroomDto: UpdateGamechatroomDto): Promise<UpdateGamechatroomDto & import("./entities/gamechatroom.entity").Gamechatroom>;
    joinGameChatRoom(gameChatRoomId: string, gamerId: string): Promise<boolean>;
    remove(id: string): string;
}
