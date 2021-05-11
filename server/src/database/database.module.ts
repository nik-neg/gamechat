import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Gamechatroom } from 'src/gamechatroom/entities/gamechatroom.entity';
import { Gamer } from 'src/gamer/entities/gamer.entity';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Message, Gamer, Game, Gamechatroom],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
