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
exports.Gamer = void 0;
const gamechatroom_entity_1 = require("../../gamechatroom/entities/gamechatroom.entity");
const message_entity_1 = require("../../message/entities/message.entity");
const typeorm_1 = require("typeorm");
let Gamer = class Gamer {
    constructor() {
        this.notifications = [];
        this.favouriteGameChats = [];
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Gamer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Gamer.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Gamer.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Gamer.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Gamer.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Gamer.prototype, "language", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        default: () => "''",
    }),
    __metadata("design:type", String)
], Gamer.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: false,
    }),
    __metadata("design:type", Array)
], Gamer.prototype, "notifications", void 0);
__decorate([
    typeorm_1.Column({
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: false,
    }),
    __metadata("design:type", Array)
], Gamer.prototype, "favouriteGameChats", void 0);
__decorate([
    typeorm_1.Column({
        type: 'boolean',
        default: () => false,
    }),
    __metadata("design:type", Boolean)
], Gamer.prototype, "isAdmin", void 0);
__decorate([
    typeorm_1.OneToMany((type) => message_entity_1.Message, (message) => message.gamer),
    __metadata("design:type", Array)
], Gamer.prototype, "messages", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => gamechatroom_entity_1.Gamechatroom, (gamechatroom) => gamechatroom.gamer),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Gamer.prototype, "gameChatRoom", void 0);
Gamer = __decorate([
    typeorm_1.Entity()
], Gamer);
exports.Gamer = Gamer;
//# sourceMappingURL=gamer.entity.js.map