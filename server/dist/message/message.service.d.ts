import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Gamechatroom } from '../gamechatroom/entities/gamechatroom.entity';
import { Gamer } from '../gamer/entities/gamer.entity';
export declare class MessageService {
    private readonly messageRepository;
    private readonly gameChatRoomRepository;
    private readonly gamerRepository;
    constructor(messageRepository: Repository<Message>, gameChatRoomRepository: Repository<Gamechatroom>, gamerRepository: Repository<Gamer>);
    create(createMessageDto: CreateMessageDto, gamerId: any, chatRoomId: any, userLanguage: any): Promise<Message>;
    translateOneMessage(userLanguage: string, saveResponseMessage: Message): Promise<string>;
    findAllMessagesInAChatRoomAndStoreToDatabase(userLanguage: any, chatRoomId: any): Promise<Message[]>;
    findOne(id: number): string;
    update(id: number, updateMessageDto: UpdateMessageDto): Promise<void>;
    remove(id: number): string;
}
