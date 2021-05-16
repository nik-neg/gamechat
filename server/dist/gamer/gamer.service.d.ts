import { Repository } from 'typeorm';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';
import { Gamer } from './entities/gamer.entity';
export declare class GamerService {
    private readonly gamerRepository;
    constructor(gamerRepository: Repository<Gamer>);
    create(createGamerDto: CreateGamerDto): Promise<Gamer>;
    findAll(): string;
    findOne(id: number): Promise<Gamer>;
    login(email: string, password: string): Promise<Gamer>;
    update(id: any, updateGamerDto: UpdateGamerDto): Promise<{
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
    } & Gamer>;
    remove(id: number): string;
    private hashPassword;
}
