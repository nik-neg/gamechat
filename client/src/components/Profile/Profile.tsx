import React from 'react';
import classes from './Profile.module.scss';
import { Avatar } from '@material-ui/core';
import { useAppSelector } from '../../hooks/redux';

//favourite Rooms

const Profile = (): JSX.Element => {
  const gamer = useAppSelector((state) => state.auth);

  const getInitial = () => {
    return `${gamer.firstName} ${gamer.lastName}`.split(' ').map((n) => n[0]);
  };

  if (gamer) {
    return (
      <div className={classes.container}>
        {/* <div className={classes.name}>
          <Avatar
            aria-label="recipe"
            classes={{
              colorDefault: classes['avatar-colorDefault'],
            }}
          >
            {getInitial()}
          </Avatar>
          <h1>{gamer.firstName}</h1>
        </div>
        <h2>Favourite Game Chats:</h2>
        {gamer.favouriteGameChats
          ? gamer.favouriteGameChats.map((gameChat) => {
              return <span key={gameChat.id}>{gameChat.id}</span>;
            })
          : null} */}
      </div>
    );
  } else return <div>Hello</div>;
};

export default Profile;
