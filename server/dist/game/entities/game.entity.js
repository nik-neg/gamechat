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
exports.Game = void 0;
const gamechatroom_entity_1 = require("../../gamechatroom/entities/gamechatroom.entity");
const typeorm_1 = require("typeorm");
let Game = class Game {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Game.prototype, "apiId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Game.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: false,
    }),
    __metadata("design:type", Array)
], Game.prototype, "genreList", void 0);
__decorate([
    typeorm_1.Column({
        type: 'jsonb',
        array: false,
        default: () => "'{}'",
        nullable: false,
    }),
    __metadata("design:type", Object)
], Game.prototype, "dominantGenre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Game.prototype, "releaseDate", void 0);
__decorate([
    typeorm_1.Column({
        type: 'jsonb',
        array: false,
        default: () => "'{}'",
        nullable: false,
    }),
    __metadata("design:type", Object)
], Game.prototype, "imagesPath", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], Game.prototype, "consoles", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Game.prototype, "ageRating", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Game.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToOne((type) => gamechatroom_entity_1.Gamechatroom, (gameChatRoom) => gameChatRoom.game),
    __metadata("design:type", gamechatroom_entity_1.Gamechatroom)
], Game.prototype, "gameChatRoom", void 0);
Game = __decorate([
    typeorm_1.Entity()
], Game);
exports.Game = Game;
//# sourceMappingURL=game.entity.js.map