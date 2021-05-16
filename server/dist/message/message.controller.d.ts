import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto, userId: number, chatRoomId: number, userLanguage: string): Promise<import("./entities/message.entity").Message>;
    findAll(chatRoomId: string, userLanguage: string): Promise<import("./entities/message.entity").Message[]>;
    findOne(id: string): string;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<void>;
    remove(id: string): string;
}
