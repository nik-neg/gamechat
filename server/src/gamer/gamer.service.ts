import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';
import { Gamer } from './entities/gamer.entity';

@Injectable()
export class GamerService {
  constructor(
    @InjectRepository(Gamer)
    private readonly gamerRepository: Repository<Gamer>,
  ) {}

  async create(createGamerDto: CreateGamerDto) {
    let gamer = new Gamer();
    gamer.firstName = createGamerDto.firstName;
    gamer.lastName = createGamerDto.lastName;
    gamer.email = createGamerDto.email;
    gamer.password = createGamerDto.password;
    gamer.avatar = createGamerDto.avatar;
    console.log(createGamerDto.notifications);
    gamer.notifications = createGamerDto.notifications;
    gamer.favouriteGameChats = createGamerDto.favouriteGameChats;
    gamer.isAdmin = createGamerDto.isAdmin;
    try {
      const response = await this.gamerRepository.save(gamer);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all gamer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gamer`;
  }

  update(id: number, updateGamerDto: UpdateGamerDto) {
    return `This action updates a #${id} gamer`;
  }

  remove(id: number) {
    return `This action removes a #${id} gamer`;
  }
}
