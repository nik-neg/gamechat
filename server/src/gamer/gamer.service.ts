import { Injectable, NotFoundException } from '@nestjs/common';
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
    const gamer = this.gamerRepository.findOne({ id });
    if (!gamer) throw new NotFoundException('The user does not exist');
    return gamer;
  }

  async login(email: string, password: string) {
    // Don't add try catch to send back 404
    const gamer = await this.gamerRepository.findOne({ email });
    if (!gamer || gamer.password !== password)
      throw new NotFoundException('Invalid credentials');
    return gamer;
  }

  async update(id, updateGamerDto: UpdateGamerDto) {
    try {
      const gamer = await this.gamerRepository.findOne({ id });
      const updatedGamer = { ...gamer, ...updateGamerDto };
      const response = await this.gamerRepository.save(updatedGamer);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} gamer`;
  }
}
