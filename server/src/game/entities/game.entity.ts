import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apiId: number;

  @Column()
  title: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  genreList: Array<{ id: string; name: string }>;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'{}'",
    nullable: false,
  })
  dominantGenre: { id: string; name: string };

  @Column()
  releaseDate: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'{}'",
    nullable: false,
  })
  imagesPath: { cover: string; screenshots: string[] };

  @Column('text', { array: true })
  consoles: string[];

  @Column()
  ageRating: string;

  @Column()
  description: string;

  @OneToOne((type) => Gamechatroom, (gameChatRoom) => gameChatRoom.game)
  gameChatRoom: Gamechatroom;
}
