import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2229',
      database: 'test',
      entities: [Message, Gamer, Game, Gamechatroom],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
