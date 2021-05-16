import { Repository } from 'typeorm';
import { CreateGamechatroomDto } from './dto/create-gamechatroom.dto';
import { UpdateGamechatroomDto } from './dto/update-gamechatroom.dto';
import { Gamechatroom } from './entities/gamechatroom.entity';
import { Gamer } from '../gamer/entities/gamer.entity';
export declare class GamechatroomService {
    private readonly gameChatRoomRepository;
    private readonly gamerRepository;
    constructor(gameChatRoomRepository: Repository<Gamechatroom>, gamerRepository: Repository<Gamer>);
    create(createGamechatroomDto: CreateGamechatroomDto, gamerId: any): Promise<Gamechatroom>;
    joinGameChatRoom(gameChatRoomId: number, gamerId: number): Promise<boolean>;
    findAll(gamerId: number, userLang: string): void;
    findOne(id: number): Promise<Gamechatroom>;
    update(id: number, updateGamechatroomDto: UpdateGamechatroomDto): Promise<UpdateGamechatroomDto & Gamechatroom>;
    remove(id: number): string;
}
