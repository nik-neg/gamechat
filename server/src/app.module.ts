import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { DatabaseModule } from './database/database.module';
import { GameModule } from './game/game.module';
import { GamechatroomModule } from './gamechatroom/gamechatroom.module';
import { GamerModule } from './gamer/gamer.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MessageModule,
    DatabaseModule,
    GameModule,
    GamechatroomModule,
    GamerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
