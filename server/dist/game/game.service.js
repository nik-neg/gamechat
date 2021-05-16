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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_gamer_dto_1 = require("../gamer/dto/create-gamer.dto");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("./entities/game.entity");
const axios_1 = require("axios");
let GameService = class GameService {
    constructor(gameRepository) {
        this.gameRepository = gameRepository;
    }
    async create(name, gameChatRoomId) {
        let game = new game_entity_1.Game();
        game.gameChatRoom = gameChatRoomId;
        const newGame = await this.fetchOne(name);
        const gameSaved = await this.gameRepository.findOne({ apiId: newGame.id });
        if (gameSaved)
            throw new common_1.ConflictException('Game already exists');
        const screenshots = newGame.platforms
            .map((p) => p.platform.image_background)
            .concat(newGame.stores.map((s) => s.store.image_background));
        const entity = {
            apiId: newGame.id,
            title: newGame.name_original || newGame.name,
            genreList: newGame.genres.map(({ id, name }) => ({
                id,
                name,
            })),
            dominantGenre: { id: newGame.genres[0].id, name: newGame.genres[0].name },
            releaseDate: new Date(newGame.released).toISOString(),
            imagesPath: { cover: newGame.background_image, screenshots },
            consoles: newGame.platforms.map((p) => p.platform.name),
            ageRating: newGame.esrb_rating ? newGame.esrb_rating.name : '',
            description: newGame.description_raw,
        };
        game = Object.assign(game, Object.assign({}, entity));
        const response = await this.gameRepository.save(game);
        return response;
    }
    async fetchOne(name) {
        const res = await axios_1.default.get(`${process.env.GAME_API_URL}/games?key=${process.env.GAME_API_KEY}&search=${name}`);
        const newGame = res.data.results[0];
        if (!newGame)
            throw new common_1.NotFoundException('The game does not exist');
        const resDetails = await axios_1.default.get(`${process.env.GAME_API_URL}/games/${newGame.id}?key=${process.env.GAME_API_KEY}`);
        const { platforms, stores, description_raw } = resDetails.data;
        return Object.assign(Object.assign({}, newGame), { platforms, stores, description_raw });
    }
    async uploadOne(apiId) {
        const game = await this.gameRepository.findOne({ apiId });
        if (game)
            return game;
        const res = await axios_1.default.get(`${process.env.GAME_API_URL}/games/${apiId}?key=${process.env.GAME_API_KEY}`);
        const resScreenshots = await axios_1.default.get(`${process.env.GAME_API_URL}/games/${apiId}/screenshots?key=${process.env.GAME_API_KEY}`);
        const screenshots = resScreenshots.data.results.map(({ image }) => image);
        const newGame = res.data;
        if (!newGame)
            throw new common_1.NotFoundException('The newGame does not exist');
        const entity = {
            apiId,
            title: newGame.name_original || newGame.name,
            genreList: newGame.genres.map(({ id, name }) => ({
                id,
                name,
            })),
            dominantGenre: { id: newGame.genres[0].id, name: newGame.genres[0].name },
            releaseDate: new Date(newGame.released).toISOString(),
            imagesPath: { cover: newGame.background_image, screenshots },
            consoles: newGame.platforms.map((p) => p.platform.name),
            ageRating: newGame.esrb_rating.name,
            description: newGame.description_raw,
        };
        const response = await this.gameRepository.save(entity);
        return response;
    }
    findAll() {
        return `This action returns all game`;
    }
    findOne(id) {
        return `This action returns a #${id} game`;
    }
    update(id, updateGameDto) {
        return `This action updates a #${id} game`;
    }
    remove(id) {
        return `This action removes a #${id} game`;
    }
};
GameService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(game_entity_1.Game)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map