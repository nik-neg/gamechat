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

  // @Column()
  // isQuestion: boolean;

  // @Column()
  // likes: number;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

  @ManyToOne((type) => Gamer, (gamer) => gamer.messages)
  gamer: Gamer;
}
