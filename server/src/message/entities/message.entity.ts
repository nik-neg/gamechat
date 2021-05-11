import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isQuestion: boolean;

  @Column()
  likes: number;

  @Column()
  liked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => Gamer, (gamer) => gamer.messages)
  gamer: Gamer;

  @ManyToOne((type) => Gamechatroom, (gameChatRoom) => gameChatRoom.messages)
  gameChatRoom: Gamechatroom;
}
