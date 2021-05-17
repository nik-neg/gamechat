import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamerService } from './gamer.service';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';

@Controller('gamer')
export class GamerController {
  constructor(private readonly gamerService: GamerService) {}

  @Post('register')
  create(@Body() createGamerDto: CreateGamerDto) {
    return this.gamerService.create(createGamerDto);
  }

  @Get()
  findAll() {
    return this.gamerService.findAll();
  }

  @Get('gamechatroom/:id')
  findAllInChatRoom(@Param('id') gameChatRoomId: string) {
    return this.gamerService.findAllInChatRoom(+gameChatRoomId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamerService.findOne(+id);
  }

  @Post('login')
  login(@Body('password') password: string, @Body('email') email: string) {
    return this.gamerService.login(email, password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGamerDto: UpdateGamerDto) {
    return this.gamerService.update(+id, updateGamerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamerService.remove(+id);
  }
}
