import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':id/gamechatroom/:chatRoomId/:language')
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') userId: number,
    @Param('chatRoomId') chatRoomId: number,
    @Param('language') userLanguage: string,
  ) {
    return this.messageService.create(
      createMessageDto,
      +userId,
      chatRoomId,
      userLanguage,
    );
  }

  @Patch('gamechatroom/:id/all/:language')
  findAll(
    @Param('id') chatRoomId: string,
    @Param('language') userLanguage: string,
  ) {
    return this.messageService.findAllMessagesInAChatRoomAndStoreToDatabase(
      userLanguage,
      chatRoomId,
    );
  }

  // @Patch(':messageId/gamechatroom/:gameChatRoomId/:language') // /message/1/gamechatroom/1/FR
  // translateMessage(
  //   @Body() updateMessageDto: UpdateMessageDto,
  //   @Param('messageId') messageId: string,
  //   @Param('gameChatRoomId') gameChatRoomId: string,
  //   @Param('language') userLanguage: string,
  // ) {
  //   return this.messageService.translateOneMessage(
  //     messageId,
  //     gameChatRoomId,
  //     userLanguage
  //   );
  // }

  @Get('all')
  findAllMessages() {
    return this.messageService.findAllMessages();
  }
  @Get('gamechatroom/:id')
  findAllMessagesForAChatRoom(@Param('id') id: string) {
    return this.messageService.findAllMessagesForAChatRoom(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
