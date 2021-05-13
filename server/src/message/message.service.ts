import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Gamechatroom } from '../gamechatroom/entities/gamechatroom.entity';
// @InjectRepository(User) private readonly userRepository: Repository<User>

import axios from 'axios';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Gamechatroom)
    private readonly gameChatRoomRepository: Repository<Gamechatroom>,
  ) {}
  async create(
    createMessageDto: CreateMessageDto,
    gamerId,
    chatRoomId,
    userLanguage,
  ) {
    // call API
    let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${createMessageDto.content}&target_lang=${userLanguage}`;
    translateURL = encodeURI(translateURL);
    await axios
      .post(translateURL, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(function (response) {
        createMessageDto.translatedContent[userLanguage] =
          response.data.translations[0].text;
      })
      .catch(function (error) {
        console.log(error);
      });
    let message = new Message();
    message = Object.assign(message, { ...createMessageDto });
    message.gamer = gamerId;
    message.gameChatRoom = chatRoomId;
    try {
      const response = await this.messageRepository.save(message);
      // incr messagesCount of ChatRoom
      if (response.gameChatRoom) {
        const dummy = new Gamechatroom();
        dummy.id = +response.gameChatRoom;
        const gameChatRoom = await this.gameChatRoomRepository.findOne(dummy);
        gameChatRoom.messagesCount += 1;
        await this.gameChatRoomRepository.update(
          +response.gameChatRoom,
          gameChatRoom,
        );
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  findAll(userLanguage, chatRoomId) {
    return `This action returns all message`; // return array with spec. language
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const dummy = new Message();
    dummy.id = id;
    const message = await this.messageRepository.findOne(dummy);
    if (!message.liked) {
      message.likes += 1;
      message.liked = true;
    } else {
      message.likes -= 1;
      message.liked = false;
    }

    await this.messageRepository.update(id, message);
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
