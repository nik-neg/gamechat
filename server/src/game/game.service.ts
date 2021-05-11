import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGamerDto } from 'src/gamer/dto/create-gamer.dto';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import axios from 'axios';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto, gameChatRoomId) {
    let game = new Game();
    game = Object.assign(game, { ...createGameDto });
    game.gameChatRoom = gameChatRoomId;
    // console.log(game);
    try {
      const response = await this.gameRepository.save(game);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async uploadOne(apiId: number) {
    const game = await this.gameRepository.findOne({ apiId });
    if (game) return game;
    const res = await axios.get(
      `${process.env.GAME_API_URL}/games/${apiId}?key=${process.env.GAME_API_KEY}`,
    );
    const resScreenshots = await axios.get(
      `${process.env.GAME_API_URL}/games/${apiId}/screenshots?key=${process.env.GAME_API_KEY}`,
    );
    const screenshots = resScreenshots.data.results.map(
      ({ image }: { image: string }) => image,
    );

    console.log(res);
    const newGame = res.data;

    if (!newGame) throw new NotFoundException('The newGame does not exist');
    const entity = {
      apiId,
      title: newGame.name_original || newGame.name,
      genreList: newGame.genres.map(
        ({ id, name }: { id: number; name: string }) => ({
          id,
          name,
        }),
      ),
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

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
