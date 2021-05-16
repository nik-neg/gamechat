import { Module } from '@nestjs/common';
import { GamerService } from './gamer.service';
import { GamerController } from './gamer.controller';
import { Gamer } from './entities/gamer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Gamer])],
  controllers: [GamerController],
  providers: [GamerService],
})
export class GamerModule {}
