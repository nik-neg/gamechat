import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { DatabaseModule } from './database/database.module';
import { GameModule } from './game/game.module';
import { GamechatroomModule } from './gamechatroom/gamechatroom.module';
import { GamerModule } from './gamer/gamer.module';

@Module({
  imports: [
    MessageModule,
    DatabaseModule,
    GameModule,
    GamechatroomModule,
    GamerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
