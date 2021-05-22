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

// https://stackoverflow.com/questions/36467469/is-key-value-pair-available-in-typescript/50621451
interface TranslatedContentDictionary {
  [key: string]: string;
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // @Column({
  //   type: 'jsonb',
  //   array: false,
  //   default: () => "'[]'",
  //   nullable: false,
  // })
  // translatedContent: Array<{countryCode: string = contentn:string}> = [];

  @Column({ type: 'json' })
  translatedContent: TranslatedContentDictionary;

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
