import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar/AppBar';
import MediaCard from '../MediaCard/MediaCard';
import { Box } from '@material-ui/core';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { io } from 'socket.io-client';
import classes from './Home.module.scss';
import Wrapper from '../Vue/Wrapper';

const url = process.env.REACT_APP_SERVER_BASE_URL ?? '';

import DemoCarousel from '../ResponsiveCarousel/ResponsiveCarousel';
import { fetchGames } from '../../store/reducers/games';
import Game from '../../interfaces/game';
import MediaCardsList from '../MediaCardsList/MediaCardsList';
import { fetchGamesByGenre } from '../../services/game.service';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const styles = {
  root: {
    paddingLeft: '150px',
  },
};

export default function Home() {
  const style = useStyles();

  const initialGenres: string[] = [];
  const initialGamesGenre: { [genre: string]: Game[] } = {};

  const [genres, setGenres] = useState(initialGenres);
  const [gamesGenre, setGamesGenre] = useState(initialGamesGenre);
  const dispatch = useAppDispatch();
  const gameReducer = useAppSelector((state) => state.games);

  const games: Game[] = gameReducer.ids.map((id) => gameReducer.entities[id]);

  useEffect(() => {
    dispatch(fetchGames());
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const gamesGenre = await fetchGamesByGenre();
    const genreCat: string[] = Object.keys(gamesGenre);
    setGenres(genreCat);
    setGamesGenre(gamesGenre);
  };
  //TODO : most talked about game
  return (
    <div className={`${style.root} ${classes.container}`}>
      <div className={classes.carousel}>
        <DemoCarousel cards={games.slice(0, 5)} />
      </div>
      {genres.length &&
        genres.map((g: string) => (
          <MediaCardsList key={g} title={g} cards={gamesGenre[g] || []} />
        ))}
    </div>
  );
}
