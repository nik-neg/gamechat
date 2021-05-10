import { Test, TestingModule } from '@nestjs/testing';
import { GamechatroomService } from './gamechatroom.service';

describe('GamechatroomService', () => {
  let service: GamechatroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamechatroomService],
    }).compile();

    service = module.get<GamechatroomService>(GamechatroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
