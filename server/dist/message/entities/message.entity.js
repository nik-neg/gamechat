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
exports.Message = void 0;
const gamechatroom_entity_1 = require("../../gamechatroom/entities/gamechatroom.entity");
const gamer_entity_1 = require("../../gamer/entities/gamer.entity");
const typeorm_1 = require("typeorm");
let Message = class Message {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", Object)
], Message.prototype, "translatedContent", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Message.prototype, "isQuestion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Message.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Message.prototype, "liked", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => gamer_entity_1.Gamer, (gamer) => gamer.messages),
    __metadata("design:type", gamer_entity_1.Gamer)
], Message.prototype, "gamer", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => gamechatroom_entity_1.Gamechatroom, (gameChatRoom) => gameChatRoom.messages),
    __metadata("design:type", gamechatroom_entity_1.Gamechatroom)
], Message.prototype, "gameChatRoom", void 0);
Message = __decorate([
    typeorm_1.Entity()
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map