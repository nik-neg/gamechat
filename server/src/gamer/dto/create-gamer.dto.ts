import { Message } from 'src/message/entities/message.entity';

export class CreateGamerDto {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  avatar: string;
  // billingInformation: {};
  notifications: [Message];
  favouriteGameChats: { id: number }[];
  isAdmin: boolean;

  // messages: [number];
}
