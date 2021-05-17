import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async create(name, gameChatRoomId) {
    let game = new Game();
    game.gameChatRoom = gameChatRoomId;

    const newGame = await this.fetchOne(name);
    const gameSaved = await this.gameRepository.findOne({ apiId: newGame.id });
    if (gameSaved) throw new ConflictException('Game already exists');

    const screenshots = newGame.platforms
      .map((p) => p.platform.image_background)
      .concat(newGame.stores.map((s) => s.store.image_background));

    const entity = {
      apiId: newGame.id,
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
      ageRating: newGame.esrb_rating ? newGame.esrb_rating.name : '',
      description: newGame.description_raw,
    };

    game = Object.assign(game, { ...entity });

    const response = await this.gameRepository.save(game);
    return response;
  }

  async fetchOne(name: string) {
    //TODO: some improvements are needed --> const newGame = res.data.results[0];
    const res = await axios.get(
      `${process.env.GAME_API_URL}/games?key=${process.env.GAME_API_KEY}&search=${name}`,
    );

    const newGame = res.data.results[0];
    if (!newGame) throw new NotFoundException('The game does not exist');

    const resDetails = await axios.get(
      `${process.env.GAME_API_URL}/games/${newGame.id}?key=${process.env.GAME_API_KEY}`,
    );

    const { platforms, stores, description_raw } = resDetails.data;
    return { ...newGame, platforms, stores, description_raw };
  }

  async uploadOne(apiId: number) {
    //Uploads game by apiId to database
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
      ageRating: newGame.esrb_rating ? newGame.esrb_rating.name : '',
      description: newGame.description_raw,
    };
    const response = await this.gameRepository.save(entity);
    return response;
  }

  async getGamesForAllGenres() {
    const res = await axios.get(
      `${process.env.GAME_API_URL}/genres?key=${process.env.GAME_API_KEY}`,
    );
    const allGenreInfo = res.data.results;

    const response = {};
    for (const genre of allGenreInfo) {
      const genreGames = [];
      for (const game of genre.games) {
        const oldGame = await this.gameRepository.findOne({
          apiId: game.id,
        });
        if (oldGame) {
          oldGame.dominantGenre = genre.name;
          genreGames.push(oldGame);
          continue;
        }
        const uploadedGame = await this.uploadOne(game.id);
        uploadedGame.dominantGenre = genre.name;
        await this.gameRepository.update(uploadedGame.id, uploadedGame);
        genreGames.push(uploadedGame);
      }
      response[genre.name] = genreGames;
    }
    return response;
  }

  async findAllFromDB() {
    return await this.gameRepository.find({});
  }

  async findAllFromApiAndSave() {
    const res = await axios.get(
      `${process.env.GAME_API_URL}/games?key=${process.env.GAME_API_KEY}`,
    );

    const games = res.data.results;
    const response = [];
    for (const newGame of games) {
      const oldGame = await this.gameRepository.findOne({ apiId: newGame.id });
      if (oldGame) {
        response.push(oldGame);
        continue;
      }

      const [resScreenshots, resDetails] = await Promise.all([
        axios.get(
          `${process.env.GAME_API_URL}/games/${newGame.id}/screenshots?key=${process.env.GAME_API_KEY}`,
        ),
        axios.get(
          `${process.env.GAME_API_URL}/games/${newGame.id}?key=${process.env.GAME_API_KEY}`,
        ),
      ]);

      const { platforms, stores, description_raw } = resDetails.data;
      newGame.platforms = platforms;
      newGame.stores = stores;
      newGame.description_raw = description_raw;

      const screenshots = resDetails.data.platforms
        .map((p) => p.platform.image_background)
        .concat(resDetails.data.stores.map((s) => s.store.image_background))
        .concat(
          resScreenshots.data.results.map(
            ({ image }: { image: string }) => image,
          ),
        );

      const entity = {
        apiId: newGame.id,
        title: newGame.name_original || newGame.name,
        genreList: newGame.genres.map(
          ({ id, name }: { id: number; name: string }) => ({
            id,
            name,
          }),
        ),
        dominantGenre: {
          id: newGame.genres[0].id,
          name: newGame.genres[0].name,
        },
        releaseDate: new Date(newGame.released).toISOString(),
        imagesPath: { cover: newGame.background_image, screenshots },
        consoles: newGame.platforms.map((p) => p.platform.name),
        ageRating: newGame.esrb_rating ? newGame.esrb_rating.name : '',
        description: newGame.description_raw,
      };
      const game = await this.gameRepository.save(entity);
      response.push(game);
    }

    return response;
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
