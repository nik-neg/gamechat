import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Message } from 'src/message/entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gamer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  // @Column()
  // billingInformation: {};

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  notifications: Array<Message> = [];

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  favouriteGameChats: Array<{ id: number }> = [];

  @Column()
  isAdmin: boolean;

  @OneToMany((type) => Message, (message) => message.gamer)
  messages: [Message];

  @OneToMany((type) => Gamechatroom, (gamechatroom) => gamechatroom.gamer)
  gameChatRoom: [Gamechatroom];
}
