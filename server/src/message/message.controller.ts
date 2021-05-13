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

  @Post(':id/gamechatroom/:chatRoomId')
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') userId: number,
    // @Param('language') userLanguage: string,
    @Param('chatRoomId') chatRoomId: number,
  ) {
    return this.messageService.create(createMessageDto, +userId, chatRoomId);
  }

  @Patch('gamechatroom/:id/:language')
  findAll(
    @Param('id') chatRoomId: string,
    @Param('language') userLanguage: string,
  ) {
    return this.messageService.findAllMessagesInAChatRoomAndStoreToDatabase(
      userLanguage,
      chatRoomId,
    );
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
