import React from 'react';
import classes from './Profile.module.scss';
import { Avatar } from '@material-ui/core';
import { useAppSelector } from '../../hooks/redux';
import { ReactComponent as ControllerPS1 } from '../../images/controller-playstation-01.svg';
import { ReactComponent as ControllerPS2 } from '../../images/controller-playstation-02.svg';
import { ReactComponent as ControllerPS3 } from '../../images/controller-playstation-03.svg';
import { ReactComponent as ControllerXbox } from '../../images/controller-xbox.svg';

//favourite Rooms

const Profile = (): JSX.Element => {
  const gamer = useAppSelector((state) => state.auth);

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

  if (gamer) {
    return (
      <div className={classes.container}>
        <ControllerPS3 className={classes.image} id={classes['ctr-ps-3']} />
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
            <pre> {`Favourite Game Chats: ${favGameString()}`}</pre>
          </div>
        </div>
      </div>
    );
  } else return <div>Hello</div>;
};

export default Profile;
