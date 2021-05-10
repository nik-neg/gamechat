import { Test, TestingModule } from '@nestjs/testing';
import { GamerController } from './gamer.controller';
import { GamerService } from './gamer.service';

describe('GamerController', () => {
  let controller: GamerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamerController],
      providers: [GamerService],
    }).compile();

    controller = module.get<GamerController>(GamerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
