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
exports.GamechatroomController = void 0;
const common_1 = require("@nestjs/common");
const gamechatroom_service_1 = require("./gamechatroom.service");
const create_gamechatroom_dto_1 = require("./dto/create-gamechatroom.dto");
const update_gamechatroom_dto_1 = require("./dto/update-gamechatroom.dto");
let GamechatroomController = class GamechatroomController {
    constructor(gamechatroomService) {
        this.gamechatroomService = gamechatroomService;
    }
    create(createGamechatroomDto, gamerId) {
        return this.gamechatroomService.create(createGamechatroomDto, gamerId);
    }
    findAll(gamerId, userLang) {
        return this.gamechatroomService.findAll(+gamerId, userLang);
    }
    findOne(id) {
        return this.gamechatroomService.findOne(+id);
    }
    update(id, updateGamechatroomDto) {
        return this.gamechatroomService.update(+id, updateGamechatroomDto);
    }
    joinGameChatRoom(gameChatRoomId, gamerId) {
        return this.gamechatroomService.joinGameChatRoom(+gameChatRoomId, +gamerId);
    }
    remove(id) {
        return this.gamechatroomService.remove(+id);
    }
};
__decorate([
    common_1.Post(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gamechatroom_dto_1.CreateGamechatroomDto, String]),
    __metadata("design:returntype", void 0)
], GamechatroomController.prototype, "create", null);
__decorate([
    common_1.Get(':id/:lang'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GamechatroomController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamechatroomController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_gamechatroom_dto_1.UpdateGamechatroomDto]),
    __metadata("design:returntype", void 0)
], GamechatroomController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/gamer/:gamerId'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('gamerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GamechatroomController.prototype, "joinGameChatRoom", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamechatroomController.prototype, "remove", null);
GamechatroomController = __decorate([
    common_1.Controller('gamechatroom'),
    __metadata("design:paramtypes", [gamechatroom_service_1.GamechatroomService])
], GamechatroomController);
exports.GamechatroomController = GamechatroomController;
//# sourceMappingURL=gamechatroom.controller.js.map