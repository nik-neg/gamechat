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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gamechatroom = void 0;
const game_entity_1 = require("../../game/entities/game.entity");
const gamer_entity_1 = require("../../gamer/entities/gamer.entity");
const message_entity_1 = require("../../message/entities/message.entity");
const typeorm_1 = require("typeorm");
let Gamechatroom = class Gamechatroom {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Gamechatroom.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Gamechatroom.prototype, "notificationAllowed", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Gamechatroom.prototype, "isPrivate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Gamechatroom.prototype, "messagesCount", void 0);
__decorate([
    typeorm_1.OneToOne((type) => game_entity_1.Game, (game) => game.gameChatRoom),
    __metadata("design:type", game_entity_1.Game)
], Gamechatroom.prototype, "game", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => gamer_entity_1.Gamer, (gamer) => gamer.gameChatRoom),
    __metadata("design:type", Array)
], Gamechatroom.prototype, "gamer", void 0);
__decorate([
    typeorm_1.OneToMany((type) => message_entity_1.Message, (message) => message.gameChatRoom),
    __metadata("design:type", Array)
], Gamechatroom.prototype, "messages", void 0);
Gamechatroom = __decorate([
    typeorm_1.Entity()
], Gamechatroom);
exports.Gamechatroom = Gamechatroom;
//# sourceMappingURL=gamechatroom.entity.js.map