import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamechatroomService } from './gamechatroom.service';
import { CreateGamechatroomDto } from './dto/create-gamechatroom.dto';
import { UpdateGamechatroomDto } from './dto/update-gamechatroom.dto';

@Controller('gamechatroom')
export class GamechatroomController {
  constructor(private readonly gamechatroomService: GamechatroomService) {}

  @Post(':id')
  create(
    @Body() createGamechatroomDto: CreateGamechatroomDto,
    @Param('id') gamerId: string,
  ) {
    return this.gamechatroomService.create(createGamechatroomDto, gamerId);
  }

  @Get(':id/:lang')
  findAll(@Param('id') gamerId: string, @Param('lang') userLang: string) {
    return this.gamechatroomService.findAll(+gamerId, userLang);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamechatroomService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGamechatroomDto: UpdateGamechatroomDto,
  ) {
    return this.gamechatroomService.update(+id, updateGamechatroomDto);
  }

  @Patch(':id/gamer/:gamerId')
  joinGameChatRoom(
    @Param('id') gameChatRoomId: string,
    @Param('gamerId') gamerId: string,
  ) {
    return this.gamechatroomService.joinGameChatRoom(+gameChatRoomId, +gamerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamechatroomService.remove(+id);
  }
}
