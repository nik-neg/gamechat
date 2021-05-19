import React from 'react';
import PropTypes from 'prop-types';

import MediaCard from './MediaCard/MediaCard';

import classes from './MediaCardsList.module.scss';
import Game from '../../interfaces/game';
import Spinner from '../Spinner/Spinner';

const MediaCardsList = (props: any): JSX.Element => {
  const limitInput = (input: string) => {
    return input.length > 60 ? input.substring(0, 60) + '...' : input;
  };

  const displayCards = () => {
    const cards = props.cards.lenght ? (
      props.cards.map((card: Game) => (
        <MediaCard
          key={card.id}
          imagePath={card.imagesPath.cover}
          title={card.title}
          description={limitInput(card.description)}
          id={card.id} //TODO: change to id of game chat room
        />
      ))
    ) : (
      <Spinner />
    );
    return cards;
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{props.title}</h2>
      <div className={classes['items-list']}>
        {props.cards.map((card: Game) => (
          <MediaCard
            key={card.id}
            imagePath={card.imagesPath.cover}
            title={card.title}
            description={limitInput(card.description)}
            id={card.gameChatRoom.id} //TODO: change to id of game chat room
          />
        ))}
      </div>
    </div>
  );
};

MediaCardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default MediaCardsList;
