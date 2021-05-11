import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Gamechatroom } from '../gamechatroom/entities/gamechatroom.entity';
import { GamechatroomService } from '../gamechatroom/gamechatroom.service';
// @InjectRepository(User) private readonly userRepository: Repository<User>
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Gamechatroom)
    private readonly gameChatRoomRepository: Repository<Gamechatroom>,
  ) {}
  async create(createMessageDto: CreateMessageDto, gamerId, chatRoomId) {
    let message = new Message();
    message = Object.assign(message, { ...createMessageDto });
    message.gamer = gamerId;
    message.gameChatRoom = chatRoomId;
    try {
      const response = await this.messageRepository.save(message);
      // incr messagesCount of ChatRoom
      if (response.gameChatRoom) {
        let dummy = new Gamechatroom();
        dummy.id = +response.gameChatRoom;
        const gameChatRoom = await this.gameChatRoomRepository.findOne(dummy);
        gameChatRoom.messagesCount += 1;
        await this.gameChatRoomRepository.update(+response.gameChatRoom, gameChatRoom);
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
