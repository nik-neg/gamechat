import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gamechatroom } from '../gamechatroom/entities/gamechatroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), TypeOrmModule.forFeature([Gamechatroom])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
