import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';
import { Gamer } from './entities/gamer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GamerService {
  constructor(
    @InjectRepository(Gamer)
    private readonly gamerRepository: Repository<Gamer>,
  ) {}

  async create(createGamerDto: CreateGamerDto) {
    const gamer = new Gamer();
    const hash = await this.hashPassword(createGamerDto.password);

    const oldGamer = this.gamerRepository.findOne({
      email: createGamerDto.email,
    });
    if (oldGamer) throw new NotFoundException('Invalid email or password');

    gamer.firstName = createGamerDto.firstName;
    gamer.lastName = createGamerDto.lastName;
    gamer.email = createGamerDto.email;
    gamer.password = hash;
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
    console.log(`process.env.SECRET`, process.env.SECRET);
    if (!gamer) throw new NotFoundException('The user does not exist');
    return gamer;
  }

  async login(email: string, password: string) {
    // Don't add try catch to send back 404
    const gamer = await this.gamerRepository.findOne({ email });
    const isMatch = await bcrypt.compare(password, gamer.password);
    if (!gamer || !isMatch) throw new NotFoundException('Invalid credentials');
    return gamer;
  }

  async update(id, updateGamerDto: UpdateGamerDto) {
    const gamer = await this.gamerRepository.findOne({ id });
    if (!gamer) throw new NotFoundException('The user does not exist');
    let updatedGamer = { ...gamer, ...updateGamerDto };
    if (updateGamerDto.password) {
      const hash = await this.hashPassword(updateGamerDto.password);
      updatedGamer = { ...updatedGamer, password: hash };
    }
    const response = await this.gamerRepository.save(updatedGamer);
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} gamer`;
  }

  private async hashPassword(password: string) {
    const saltRounds = 8;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
}
