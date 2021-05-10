import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genreList: string;

  @Column()
  dominantGenre: string;

  @Column()
  coverImagePath: string;

  @Column()
  consoles: string;

  @Column()
  ageRating: number;

  @Column()
  description: string;

  @OneToOne((type) => Gamechatroom, (gameChatRoom) => gameChatRoom.game)
  gameChatRoom: Gamechatroom;
}
