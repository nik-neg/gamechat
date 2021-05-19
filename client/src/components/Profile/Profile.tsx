import React, { useState } from 'react';
import classes from './Profile.module.scss';
import { Avatar } from '@material-ui/core';
import { useAppSelector } from '../../hooks/redux';
import { ReactComponent as ControllerPS3 } from '../../images/controller-playstation-03.svg';
import { ReactComponent as ControllerXbox } from '../../images/controller-xbox.svg';
import MediaCardsList from '../MediaCardsList/MediaCardsList';

import Game from '../../interfaces/game';

const Profile = (): JSX.Element => {
  const gamer = useAppSelector((state) => state.auth);
  const games = useAppSelector((state) => state.games.entities);
  const [cards, setCards] = useState(getFavouriteGameChats());

  const getInitial = () => {
    return `${gamer.firstName} ${gamer.lastName}`.split(' ').map((n) => n[0]);
  };

  function favGameString() {
    if (!gamer.favouriteGameChats) return '';
    let str = '';
    gamer.favouriteGameChats.forEach((gc, index) => {
      str += gc.id;
      str += ', ';
    });
    return str.slice(0, -2);
  }

  function getFavouriteGameChats() {
    if (!gamer.favouriteGameChats) return null;
    console.log(gamer.favouriteGameChats);
    const favGameIds = gamer.favouriteGameChats.map((fgc) => {
      return Object.keys(games).find((gameId) => {
        if (games[gameId].gameChatRoom.id === fgc.id) return gameId;
      });
    });
    const favGames = favGameIds.map((id) => (id ? games[id] : null));
    return favGames.filter((game) => !!game);
  }

  if (gamer) {
    return (
      <div className={classes.container}>
        <ControllerPS3 className={classes.image} id={classes['ctr-ps-3']} />
        <ControllerXbox className={classes.image} id={classes['ctr-xbox']} />
        <div className={classes.outer__container}>
          <div className={classes.circle__container}>
            <div className={classes.title__container}>
              <h1>{gamer.firstName}</h1>
              <Avatar
                aria-label="recipe"
                classes={{
                  root: classes.avatar,
                  colorDefault: classes['avatar-colorDefault'],
                }}
              >
                {getInitial()}
              </Avatar>
            </div>
            <div className={classes.information}>
              <div className={classes.details}>Details:</div>
              <pre> {`First Name: ${gamer.firstName}`}</pre>
              <pre> {`Last Name: ${gamer.lastName}`}</pre>
              <pre> {`Email: ${gamer.email}`}</pre>
              <pre> {`Language: ${gamer.language}`}</pre>
            </div>
          </div>
          <div className={classes.cards__container}>
            <MediaCardsList
              title="Favourite Game Chats:"
              cards={cards?.slice(0, 3)}
            />
          </div>
        </div>
        {/* Refactor Very Much Needed  */}
        <div className={classes.cards__container__extra}>
          <MediaCardsList cards={cards?.slice(3)} />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default Profile;
