import { Test, TestingModule } from '@nestjs/testing';
import { GamechatroomController } from './gamechatroom.controller';
import { GamechatroomService } from './gamechatroom.service';

describe('GamechatroomController', () => {
  let controller: GamechatroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamechatroomController],
      providers: [GamechatroomService],
    }).compile();

    controller = module.get<GamechatroomController>(GamechatroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
