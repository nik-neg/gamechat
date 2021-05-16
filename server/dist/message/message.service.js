"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const gamechatroom_entity_1 = require("../gamechatroom/entities/gamechatroom.entity");
const gamer_entity_1 = require("../gamer/entities/gamer.entity");
const axios_1 = require("axios");
const typeorm_3 = require("typeorm");
let MessageService = class MessageService {
    constructor(messageRepository, gameChatRoomRepository, gamerRepository) {
        this.messageRepository = messageRepository;
        this.gameChatRoomRepository = gameChatRoomRepository;
        this.gamerRepository = gamerRepository;
    }
    async create(createMessageDto, gamerId, chatRoomId, userLanguage) {
        let message = new message_entity_1.Message();
        message = Object.assign(message, Object.assign({}, createMessageDto));
        message.gamer = await this.gamerRepository.findOne({ id: gamerId });
        message.gameChatRoom = await this.gameChatRoomRepository.findOne({
            id: chatRoomId,
        });
        try {
            const translatedMessageresponse = await this.messageRepository.save(message);
            if (translatedMessageresponse.gameChatRoom.id) {
                const gameChatRoom = await this.gameChatRoomRepository.findOne({
                    id: chatRoomId,
                });
                gameChatRoom.messagesCount += 1;
                await this.gameChatRoomRepository.update(+translatedMessageresponse.gameChatRoom.id, gameChatRoom);
            }
            const translatedMessageContent = await this.translateOneMessage(userLanguage, translatedMessageresponse);
            translatedMessageresponse.translatedContent[userLanguage] = translatedMessageContent;
            await this.messageRepository.update(translatedMessageresponse.id, translatedMessageresponse);
            return await this.messageRepository.findOne({
                id: translatedMessageresponse.id,
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async translateOneMessage(userLanguage, saveResponseMessage) {
        let translatedMessageContent;
        let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${saveResponseMessage.content}&target_lang=${userLanguage}`;
        translateURL = encodeURI(translateURL);
        await axios_1.default
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
        const gameChatRoom = await this.gameChatRoomRepository.findOne({
            id: chatRoomId,
        });
        const messages = await typeorm_3.getManager()
            .createQueryBuilder()
            .select('message')
            .from(message_entity_1.Message, 'message')
            .where('message.gameChatRoomId = :id', { id: gameChatRoom.id })
            .getMany();
        for (const message of messages) {
            let translateURL = `${process.env.DEEPL_API_URL}?auth_key=${process.env.DEEPL_API_KEY}&text=${message.content}&target_lang=${userLanguage}`;
            translateURL = encodeURI(translateURL);
            await axios_1.default
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
        return messages;
    }
    findOne(id) {
        return `This action returns a #${id} message`;
    }
    async update(id, updateMessageDto) {
        const dummy = new message_entity_1.Message();
        dummy.id = id;
        const message = await this.messageRepository.findOne(dummy);
        if (!message.liked) {
            message.likes += 1;
            message.liked = true;
        }
        else {
            message.likes -= 1;
            message.liked = false;
        }
        await this.messageRepository.update(id, message);
    }
    remove(id) {
        return `This action removes a #${id} message`;
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(message_entity_1.Message)),
    __param(1, typeorm_1.InjectRepository(gamechatroom_entity_1.Gamechatroom)),
    __param(2, typeorm_1.InjectRepository(gamer_entity_1.Gamer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map