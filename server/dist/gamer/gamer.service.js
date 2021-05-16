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
exports.GamerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gamer_entity_1 = require("./entities/gamer.entity");
const bcrypt = require("bcrypt");
let GamerService = class GamerService {
    constructor(gamerRepository) {
        this.gamerRepository = gamerRepository;
    }
    async create(createGamerDto) {
        const gamer = new gamer_entity_1.Gamer();
        const hash = await this.hashPassword(createGamerDto.password);
        const oldGamer = await this.gamerRepository.findOne({
            email: createGamerDto.email,
        });
        if (oldGamer)
            throw new common_1.UnauthorizedException('User already exist');
        gamer.firstName = createGamerDto.firstName;
        gamer.lastName = createGamerDto.lastName;
        gamer.email = createGamerDto.email;
        gamer.password = hash;
        gamer.avatar = createGamerDto.avatar;
        gamer.notifications = createGamerDto.notifications;
        gamer.favouriteGameChats = createGamerDto.favouriteGameChats;
        gamer.isAdmin = createGamerDto.isAdmin;
        gamer.language = createGamerDto.language;
        try {
            const response = await this.gamerRepository.save(gamer);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    findAll() {
        return `This action returns all gamer`;
    }
    findOne(id) {
        const gamer = this.gamerRepository.findOne({ id });
        if (!gamer)
            throw new common_1.NotFoundException('The user does not exist');
        return gamer;
    }
    async login(email, password) {
        const gamer = await this.gamerRepository.findOne({ email });
        const isMatch = await bcrypt.compare(password, gamer.password);
        if (!gamer || !isMatch)
            throw new common_1.NotFoundException('Invalid credentials');
        return gamer;
    }
    async update(id, updateGamerDto) {
        const gamer = await this.gamerRepository.findOne({ id });
        if (!gamer)
            throw new common_1.NotFoundException('The user does not exist');
        let updatedGamer = Object.assign(Object.assign({}, gamer), updateGamerDto);
        if (updateGamerDto.password) {
            const hash = await this.hashPassword(updateGamerDto.password);
            updatedGamer = Object.assign(Object.assign({}, updatedGamer), { password: hash });
        }
        const response = await this.gamerRepository.save(updatedGamer);
        return response;
    }
    remove(id) {
        return `This action removes a #${id} gamer`;
    }
    async hashPassword(password) {
        const saltRounds = 8;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }
};
GamerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(gamer_entity_1.Gamer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GamerService);
exports.GamerService = GamerService;
//# sourceMappingURL=gamer.service.js.map