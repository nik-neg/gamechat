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
exports.GamerController = void 0;
const common_1 = require("@nestjs/common");
const gamer_service_1 = require("./gamer.service");
const create_gamer_dto_1 = require("./dto/create-gamer.dto");
const update_gamer_dto_1 = require("./dto/update-gamer.dto");
let GamerController = class GamerController {
    constructor(gamerService) {
        this.gamerService = gamerService;
    }
    create(createGamerDto) {
        return this.gamerService.create(createGamerDto);
    }
    findAll() {
        return this.gamerService.findAll();
    }
    findOne(id) {
        return this.gamerService.findOne(+id);
    }
    login(password, email) {
        return this.gamerService.login(email, password);
    }
    update(id, updateGamerDto) {
        return this.gamerService.update(+id, updateGamerDto);
    }
    remove(id) {
        return this.gamerService.remove(+id);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gamer_dto_1.CreateGamerDto]),
    __metadata("design:returntype", void 0)
], GamerController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamerController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamerController.prototype, "findOne", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body('password')), __param(1, common_1.Body('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GamerController.prototype, "login", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_gamer_dto_1.UpdateGamerDto]),
    __metadata("design:returntype", void 0)
], GamerController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamerController.prototype, "remove", null);
GamerController = __decorate([
    common_1.Controller('gamer'),
    __metadata("design:paramtypes", [gamer_service_1.GamerService])
], GamerController);
exports.GamerController = GamerController;
//# sourceMappingURL=gamer.controller.js.map