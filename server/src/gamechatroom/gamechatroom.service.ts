import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGamechatroomDto } from './dto/create-gamechatroom.dto';
import { UpdateGamechatroomDto } from './dto/update-gamechatroom.dto';
import { Gamechatroom } from './entities/gamechatroom.entity';
import { Gamer } from '../gamer/entities/gamer.entity';
import { Game } from '../game/entities/game.entity';

@Injectable()
export class GamechatroomService {
  constructor(
    @InjectRepository(Gamechatroom)
    private readonly gameChatRoomRepository: Repository<Gamechatroom>,
    @InjectRepository(Gamer)
    private readonly gamerRepository: Repository<Gamer>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  async create(createGamechatroomDto: CreateGamechatroomDto, gamerId) {
    let gameChatRoom = new Gamechatroom();
    gameChatRoom = Object.assign(gameChatRoom, { ...createGamechatroomDto });
    const gamer = await this.gamerRepository.findOne({ id: gamerId });
    gameChatRoom.gamer = gameChatRoom.gamer.concat(gamer);
    try {
      const response = await this.gameChatRoomRepository.save(gameChatRoom);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async makeGameChatRoomForAllGames() {
    //Makes Gamechatroom for all games that don't have one.
    const games = await this.gameRepository.find({});
    const allChatRooms = await this.gameChatRoomRepository.find({
      relations: ['game'],
    });
    const chatRooms = [];
    for (const game of games) {
      //Checking if game has a chatroom already
      const oldChatRoom = allChatRooms.find((chatRoom) => {
        if (chatRoom.game.id === game.id) return chatRoom;
      });
      if (oldChatRoom) {
        chatRooms.push(oldChatRoom);
      } else {
        const gameChatRoom = new Gamechatroom();
        gameChatRoom.notificationAllowed = true;
        gameChatRoom.isPrivate = false;
        gameChatRoom.messagesCount = 0;
        gameChatRoom.game = game;
        const chatRoom = await this.gameChatRoomRepository.save(gameChatRoom);
        if (chatRoom) chatRooms.push(chatRoom);
      }
    }
    return chatRooms;
  }

  async joinGameChatRoom(gameChatRoomId: number, gamerId: number) {
    const gameChatRoom = await this.gameChatRoomRepository.findOne({
      id: gameChatRoomId,
    });
    const gamer = await this.gamerRepository.findOne({ id: gamerId });
    const prevGamers = gameChatRoom.gamer || [];
    gameChatRoom.gamer = [...prevGamers, gamer];
    await this.gameChatRoomRepository.save(gameChatRoom);
    return true;
  }

  findAll(gamerId: number, userLang: string) {
    console.log(gamerId, userLang);
  }

  findOne(id: number) {
    return this.gameChatRoomRepository.findOne({ where: { id: +id } });
  }

  update(id: number, updateGamechatroomDto: UpdateGamechatroomDto) {
    const response = this.gameChatRoomRepository.save(updateGamechatroomDto);
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} gamechatroom`;
  }
}
