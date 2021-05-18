import { Module } from '@nestjs/common';
import { GamechatroomService } from './gamechatroom.service';
import { GamechatroomController } from './gamechatroom.controller';
import { Gamechatroom } from './entities/gamechatroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gamer } from 'src/gamer/entities/gamer.entity';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gamechatroom]),
    TypeOrmModule.forFeature([Gamer]),
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [GamechatroomController],
  providers: [GamechatroomService],
})
export class GamechatroomModule {}
