import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    create(gamechatroomId: string, name: string): Promise<import("./entities/game.entity").Game>;
    findAll(): string;
    findOne(apiId: string): Promise<{
        apiId: number;
        title: any;
        genreList: any;
        dominantGenre: {
            id: any;
            name: any;
        };
        releaseDate: string;
        imagesPath: {
            cover: any;
            screenshots: any;
        };
        consoles: any;
        ageRating: any;
        description: any;
    } & import("./entities/game.entity").Game>;
    update(id: string, updateGameDto: UpdateGameDto): string;
    remove(id: string): string;
}
