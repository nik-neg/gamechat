import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGamechatroomDto } from './dto/create-gamechatroom.dto';
import { UpdateGamechatroomDto } from './dto/update-gamechatroom.dto';
import { Gamechatroom } from './entities/gamechatroom.entity';

@Injectable()
export class GamechatroomService {
  constructor(
    @InjectRepository(Gamechatroom)
    private readonly gameChatRoomRepository: Repository<Gamechatroom>,
  ) {}
  async create(createGamechatroomDto: CreateGamechatroomDto, gamerId) {
    console.log(createGamechatroomDto, gamerId);
    const gameChatRoom = new Gamechatroom();
    gameChatRoom.notificationAllowed =
      createGamechatroomDto.notificationAllowed;
    gameChatRoom.isPrivate = createGamechatroomDto.isPrivate;
    gameChatRoom.messagesCount = createGamechatroomDto.messagesCount;
    gameChatRoom.gamer = gamerId;
    try {
      const response = await this.gameChatRoomRepository.save(gameChatRoom);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  // }

  findAll() {
    return `This action returns all gamechatroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gamechatroom`;
  }

  update(id: number, updateGamechatroomDto: UpdateGamechatroomDto) {
    return `This action updates a #${id} gamechatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} gamechatroom`;
  }
}
