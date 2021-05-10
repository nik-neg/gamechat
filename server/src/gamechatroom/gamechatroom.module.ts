import { Module } from '@nestjs/common';
import { GamechatroomService } from './gamechatroom.service';
import { GamechatroomController } from './gamechatroom.controller';
import { Gamechatroom } from './entities/gamechatroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Gamechatroom])],
  controllers: [GamechatroomController],
  providers: [GamechatroomService],
})
export class GamechatroomModule {}
