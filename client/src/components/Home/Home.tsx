import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch } from '../../hooks/redux';
// import { io } from 'socket.io-client';
import classes from './Home.module.scss';

import DemoCarousel from '../ResponsiveCarousel/ResponsiveCarousel';
import { getAllGames } from '../../store/reducers/games';
import Game from '../../interfaces/game';
import MediaCardsList from '../MediaCardsList/MediaCardsList';
import { fetchGamesByGenre } from '../../services/game.service';
import Spinner from '../Spinner/Spinner';

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

export default function Home(): JSX.Element {
  const style = useStyles();

  const initialGenres: string[] = [];
  const initialGamesGenre: { [genre: string]: Game[] } = {};

  const [genres, setGenres] = useState(initialGenres);
  const [gamesGenre, setGamesGenre] = useState(initialGamesGenre);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchGenres(); // ?
  }, []);

  const fetchGenres = async () => {
    const gamesGenre = await fetchGamesByGenre();
    const genreCat: string[] = Object.keys(gamesGenre);
    console.log(genreCat);

    const familyIndex = genreCat.indexOf('Family');
    const temp = genreCat[0];
    genreCat[0] = genreCat[familyIndex];
    genreCat[familyIndex] = temp;
    setGenres(genreCat);
    setGamesGenre(gamesGenre);
    const gamesArr: Game[] = Object.values(gamesGenre);
    const gamesArrFlattened: Game[] = gamesArr.flat();

    if (genreCat.length) dispatch(getAllGames(gamesArrFlattened)); // [Redux]
  };
  //TODO : most talked about game for the carousel
  return (
    <div className={`${style.root} ${classes.container}`}>
      {gamesGenre.Family ? (
        <div className={classes.carousel}>
          <DemoCarousel cards={gamesGenre.Action} />
        </div>
      ) : (
        <Spinner />
      )}
      {genres.length ? (
        genres.map((g: string) => (
          <MediaCardsList
            key={g}
            title={g}
            cards={gamesGenre[g] ? gamesGenre[g].slice(0, 5) : []}
          />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
