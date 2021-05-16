"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGamechatroomDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_gamechatroom_dto_1 = require("./create-gamechatroom.dto");
class UpdateGamechatroomDto extends mapped_types_1.PartialType(create_gamechatroom_dto_1.CreateGamechatroomDto) {
}
exports.UpdateGamechatroomDto = UpdateGamechatroomDto;
//# sourceMappingURL=update-gamechatroom.dto.js.map