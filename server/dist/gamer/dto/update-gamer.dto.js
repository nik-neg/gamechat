"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGamerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_gamer_dto_1 = require("./create-gamer.dto");
class UpdateGamerDto extends mapped_types_1.PartialType(create_gamer_dto_1.CreateGamerDto) {
}
exports.UpdateGamerDto = UpdateGamerDto;
//# sourceMappingURL=update-gamer.dto.js.map