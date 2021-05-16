"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamechatroomModule = void 0;
const common_1 = require("@nestjs/common");
const gamechatroom_service_1 = require("./gamechatroom.service");
const gamechatroom_controller_1 = require("./gamechatroom.controller");
const gamechatroom_entity_1 = require("./entities/gamechatroom.entity");
const typeorm_1 = require("@nestjs/typeorm");
const gamer_entity_1 = require("../gamer/entities/gamer.entity");
let GamechatroomModule = class GamechatroomModule {
};
GamechatroomModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([gamechatroom_entity_1.Gamechatroom]),
            typeorm_1.TypeOrmModule.forFeature([gamer_entity_1.Gamer]),
        ],
        controllers: [gamechatroom_controller_1.GamechatroomController],
        providers: [gamechatroom_service_1.GamechatroomService],
    })
], GamechatroomModule);
exports.GamechatroomModule = GamechatroomModule;
//# sourceMappingURL=gamechatroom.module.js.map