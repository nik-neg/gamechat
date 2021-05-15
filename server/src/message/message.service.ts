import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Gamechatroom } from '../gamechatroom/entities/gamechatroom.entity';
import { Gamer } from '../gamer/entities/gamer.entity';
import axios from 'axios';

import { getConnection } from 'typeorm';
import { getRepository } from 'typeorm';
import { getManager } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Gamechatroom)
    private readonly gameChatRoomRepository: Repository<Gamechatroom>,
    @InjectRepository(Gamer)
    private readonly gamerRepository: Repository<Gamer>,
  ) {}
  async create(
    createMessageDto: CreateMessageDto,
    gamerId,
    chatRoomId,
    userLanguage,
  ) {
    let message = new Message();
    message = Object.assign(message, { ...createMessageDto });
    message.gamer = await this.gamerRepository.findOne({ id: gamerId });
    message.gameChatRoom = await this.gameChatRoomRepository.findOne({
      id: chatRoomId,
    });
    try {
      const translatedMessageresponse = await this.messageRepository.save(
        message,
      );
      if (translatedMessageresponse.gameChatRoom.id) {
        const gameChatRoom = await this.gameChatRoomRepository.findOne({
          id: chatRoomId,
        });
        gameChatRoom.messagesCount += 1;
        // console.log(response.gameChatRoom, gameChatRoom)
        await this.gameChatRoomRepository.update(
          +translatedMessageresponse.gameChatRoom.id,
          gameChatRoom,
        );
      }

      // return translated message content through the API call
      const translatedMessageContent = await this.translateOneMessage(
        userLanguage,
        translatedMessageresponse,
      );
      translatedMessageresponse.translatedContent[
        userLanguage
      ] = translatedMessageContent;
      await this.messageRepository.update(
        translatedMessageresponse.id,
        translatedMessageresponse,
      );
      return await this.messageRepository.findOne({
        id: translatedMessageresponse.id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async translateOneMessage(
    userLanguage: string,
    saveResponseMessage: Message,
  ): Promise<string> {
    // call API
    let translatedMessageContent;
    let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${saveResponseMessage.content}&target_lang=${userLanguage}`;
    translateURL = encodeURI(translateURL);
    await axios
      .post(translateURL, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(function (response) {
        translatedMessageContent = response.data.translations[0].text;
      })
      .catch(function (error) {
        console.log(error);
      });
    return translatedMessageContent;
  }

  async findAllMessagesInAChatRoomAndStoreToDatabase(userLanguage, chatRoomId) {
    // find all messages for a chat room
    const gameChatRoom = await this.gameChatRoomRepository.findOne({
      id: chatRoomId,
    });
    // use query builder
    const messages = await getManager()
      .createQueryBuilder()
      .select('message')
      .from(Message, 'message')
      .where('message.gameChatRoomId = :id', { id: gameChatRoom.id })
      .getMany(); // gameChatRoom.id
    // loop through and pass the content to the api
    for (const message of messages) {
      let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${message.content}&target_lang=${userLanguage}`;
      translateURL = encodeURI(translateURL);
      await axios
        .post(translateURL, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          message.translatedContent[userLanguage] =
            response.data.translations[0].text;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.messageRepository.update(message.id, message);
    }
    // updated messages
    return messages;
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
