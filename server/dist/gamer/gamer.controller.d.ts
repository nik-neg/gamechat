import { GamerService } from './gamer.service';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';
export declare class GamerController {
    private readonly gamerService;
    constructor(gamerService: GamerService);
    create(createGamerDto: CreateGamerDto): Promise<import("./entities/gamer.entity").Gamer>;
    findAll(): string;
    findOne(id: string): Promise<import("./entities/gamer.entity").Gamer>;
    login(password: string, email: string): Promise<import("./entities/gamer.entity").Gamer>;
    update(id: string, updateGamerDto: UpdateGamerDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        avatar: string;
        notifications: import("../message/entities/message.entity").Message[] | [import("../message/entities/message.entity").Message];
        favouriteGameChats: {
            id: number;
        }[] | {
            id: number;
        }[];
        isAdmin: boolean;
        language: string;
        messages: import("../message/entities/message.entity").Message[];
        gameChatRoom: import("../gamechatroom/entities/gamechatroom.entity").Gamechatroom[];
    } & import("./entities/gamer.entity").Gamer>;
    remove(id: string): string;
}
