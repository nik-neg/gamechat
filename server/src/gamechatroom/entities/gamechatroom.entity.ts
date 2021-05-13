import { Game } from 'src/game/entities/game.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  Entity,
  // ManyToOne,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Gamechatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  notificationAllowed: boolean;

  @Column()
  isPrivate: boolean;

  @Column()
  messagesCount: number;

  @OneToOne((type) => Game, (game) => game.gameChatRoom)
  game: Game;

  @ManyToMany((type) => Gamer, (gamer) => gamer.gameChatRoom)
  gamer: Gamer;

  @OneToMany((type) => Message, (message) => message.gameChatRoom)
  messages: Message[];
}
