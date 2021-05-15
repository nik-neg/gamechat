import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

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
  language: string;

  @Column({
    type: 'text',
    default: () => "''",
  })
  avatar: string;

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

  @Column({
    type: 'boolean',
    default: () => false,
  })
  isAdmin: boolean;

  @OneToMany((type) => Message, (message) => message.gamer)
  messages: Message[];

  @ManyToMany((type) => Gamechatroom, (gamechatroom) => gamechatroom.gamer)
  @JoinTable()
  gameChatRoom: Gamechatroom[];
}
