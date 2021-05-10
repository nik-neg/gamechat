import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  genreList: string[];

  @Column()
  dominantGenre: string;

  @Column()
  releaseDate: string;

  @Column()
  coverImagePath: string;

  @Column('text', { array: true })
  consoles: string[];

  @Column()
  ageRating: number;

  @Column()
  description: string;

  @OneToOne((type) => Gamechatroom, (gameChatRoom) => gameChatRoom.game)
  gameChatRoom: Gamechatroom;
}
