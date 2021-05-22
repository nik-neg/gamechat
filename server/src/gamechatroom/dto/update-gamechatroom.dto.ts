import { PartialType } from '@nestjs/mapped-types';
import { CreateGamechatroomDto } from './create-gamechatroom.dto';

export class UpdateGamechatroomDto extends PartialType(CreateGamechatroomDto) {}
