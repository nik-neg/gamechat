import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Gamechatroom } from '../gamechatroom/entities/gamechatroom.entity';
import { Gamer } from '../gamer/entities/gamer.entity';
import axios from 'axios';

import {getConnection} from "typeorm";
import {getRepository} from "typeorm";

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
    // userLanguage,
  ) {
    // call API
    // let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${createMessageDto.content}&target_lang=${userLanguage}`;
    // translateURL = encodeURI(translateURL);
    // await axios
    //   .post(translateURL, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   })
    //   .then(function (response) {
    //     createMessageDto.translatedContent[userLanguage] =
    //       response.data.translations[0].text;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    let message = new Message();
    message = Object.assign(message, { ...createMessageDto });
    message.gamer = await this.gamerRepository.findOne({ id: gamerId });
    message.gameChatRoom = await this.gameChatRoomRepository.findOne({ id: chatRoomId });
    try {
      const response = await this.messageRepository.save(message);
      if (response.gameChatRoom.id) {
        const gameChatRoom = await this.gameChatRoomRepository.findOne({ id: chatRoomId});
        gameChatRoom.messagesCount += 1;
        // console.log(response.gameChatRoom, gameChatRoom)
        await this.gameChatRoomRepository.update(
          +response.gameChatRoom.id,
          gameChatRoom,
        );
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async findAllMessagesInAChatRoomAndStoreToDatabase(userLanguage, chatRoomId) {
    // find all messages for a chat room
    const gameChatRoom = await this.gameChatRoomRepository.findOne({ id: chatRoomId });

    // use query builder
    // SELECT DISTINCT content FROM message, gamechatroom WHERE "gameChatRoomId"=gamechatroom.id;
    const messages = await getConnection().createQueryBuilder()
    .select("content")
    .from(Message, "message")
    .from(Gamechatroom, "gamechatroom")
    .where("message.gameChatRoomId = :id", { id: gameChatRoom.id }).getMany();


    // const messages = gameChatRoom.messages;
    // loop through and pass the content to the api
    console.log("befor", messages)
    // for (let message of messages ) {
    //   console.log("for")
    //   let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${message.content}&target_lang=${userLanguage}`;
    //   translateURL = encodeURI(translateURL);
    //   await axios
    //     .post(translateURL, {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     })
    //     .then(function (response) {
    //       message.translatedContent[userLanguage] =
    //         response.data.translations[0].text;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //     this.messageRepository.update(message.id, message);
    // }
    // return updates messages
    return 'messages';
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
