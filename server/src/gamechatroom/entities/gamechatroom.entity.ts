import { Game } from 'src/game/entities/game.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
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

  // @OneToOne((type) => Game, (game) => game.gameChatRoom)
  // game: Game;

  @ManyToOne((type) => Gamer, (gamer) => gamer.gameChatRoom)
  gamer: Gamer;
}
