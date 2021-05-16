import { Message } from 'src/message/entities/message.entity';
export declare class CreateGamerDto {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    avatar: string;
    notifications: [Message];
    favouriteGameChats: {
        id: number;
    }[];
    isAdmin: boolean;
    language: string;
}
