import { Repository } from 'typeorm';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
export declare class GameService {
    private readonly gameRepository;
    constructor(gameRepository: Repository<Game>);
    create(name: any, gameChatRoomId: any): Promise<Game>;
    fetchOne(name: string): Promise<any>;
    uploadOne(apiId: number): Promise<{
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
    } & Game>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGameDto: UpdateGameDto): string;
    remove(id: number): string;
}
