import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';
import { Gamer } from './entities/gamer.entity';
import * as bcrypt from 'bcrypt';
import { getManager } from 'typeorm';
import axios from 'axios';

@Injectable()
export class GamerService {
  constructor(
    @InjectRepository(Gamer)
    private readonly gamerRepository: Repository<Gamer>,
  ) {}

  async create(createGamerDto: CreateGamerDto) {
    const gamer = new Gamer();
    const hash = await this.hashPassword(createGamerDto.password);
    const oldGamer = await this.gamerRepository.findOne({
      email: createGamerDto.email,
    });
    if (oldGamer) throw new UnauthorizedException('User already exist');

    gamer.firstName = createGamerDto.firstName;
    gamer.lastName = createGamerDto.lastName;
    gamer.email = createGamerDto.email;
    gamer.password = hash;
    gamer.avatar = createGamerDto.avatar;
    gamer.notifications = createGamerDto.notifications;
    gamer.favouriteGameChats = createGamerDto.favouriteGameChats;
    gamer.isAdmin = createGamerDto.isAdmin;
    gamer.language = createGamerDto.language;
    try {
      const response = await this.gamerRepository.save(gamer);
      const { password, ...rest } = response;
      return { ...rest };
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    return await this.gamerRepository.find({});
  }

  async findAllInChatRoom(gameChatRoomId: number) {
    // return await getManager()
    //   .createQueryBuilder()
    //   .select('gamer')
    //   .from(Gamer, 'gamer')
    //   .where('gamer.gameChatRoom.id = :id', { id: gameChatRoomId })
    //   .getMany();

    return await this.gamerRepository.find({
      relations: ['gameChatRoom'],
      where: { id: gameChatRoomId },
    });
  }

  findOne(id: number) {
    const gamer = this.gamerRepository.findOne({ id });
    if (!gamer) throw new NotFoundException('The user does not exist');
    return gamer;
  }

  async login(email: string, password: string) {
    // Don't add try catch to send back 404
    const gamer = await this.gamerRepository.findOne({ email });
    const isMatch = await bcrypt.compare(password, gamer.password);
    if (!gamer || !isMatch) throw new NotFoundException('Invalid credentials');
    const { password: ps, ...rest } = gamer;
    return { ...rest };
  }

  async fetchAllSupportedLanguage() {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      let url = `https://api-free.deepl.com/v2/languages?auth_key=${process.env.DEEPL_API_KEY}`;
      url = encodeURI(url);
      const res = await axios.post(url, option);
      const languages = res.data;
      return languages;
    } catch (error) {
      console.log(error);
      return [];
    }
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
