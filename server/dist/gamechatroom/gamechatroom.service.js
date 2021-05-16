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
exports.GamechatroomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gamechatroom_entity_1 = require("./entities/gamechatroom.entity");
const gamer_entity_1 = require("../gamer/entities/gamer.entity");
let GamechatroomService = class GamechatroomService {
    constructor(gameChatRoomRepository, gamerRepository) {
        this.gameChatRoomRepository = gameChatRoomRepository;
        this.gamerRepository = gamerRepository;
    }
    async create(createGamechatroomDto, gamerId) {
        let gameChatRoom = new gamechatroom_entity_1.Gamechatroom();
        gameChatRoom = Object.assign(gameChatRoom, Object.assign({}, createGamechatroomDto));
        gameChatRoom.gamer = gamerId;
        try {
            const response = await this.gameChatRoomRepository.save(gameChatRoom);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async joinGameChatRoom(gameChatRoomId, gamerId) {
        const gameChatRoom = await this.gameChatRoomRepository.findOne({
            id: gameChatRoomId,
        });
        const gamer = await this.gamerRepository.findOne({ id: gamerId });
        const prevGamers = gameChatRoom.gamer || [];
        gameChatRoom.gamer = [...prevGamers, gamer];
        await this.gameChatRoomRepository.save(gameChatRoom);
        return true;
    }
    findAll(gamerId, userLang) {
        console.log(gamerId, userLang);
    }
    findOne(id) {
        return this.gameChatRoomRepository.findOne({ where: { id: +id } });
    }
    update(id, updateGamechatroomDto) {
        const response = this.gameChatRoomRepository.save(updateGamechatroomDto);
        return response;
    }
    remove(id) {
        return `This action removes a #${id} gamechatroom`;
    }
};
GamechatroomService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(gamechatroom_entity_1.Gamechatroom)),
    __param(1, typeorm_1.InjectRepository(gamer_entity_1.Gamer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GamechatroomService);
exports.GamechatroomService = GamechatroomService;
//# sourceMappingURL=gamechatroom.service.js.map