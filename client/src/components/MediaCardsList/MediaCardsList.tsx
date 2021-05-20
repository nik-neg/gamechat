import React from 'react';
import PropTypes from 'prop-types';

import MediaCard from './MediaCard/MediaCard';

import classes from './MediaCardsList.module.scss';
import Game from '../../interfaces/game';

interface Props {
  title?: string;
  cards: Game[];
}

const MediaCardsList = (props: Props): JSX.Element => {
  const limitInput = (input: string) => {
    return input.length > 60 ? input.substring(0, 60) + '...' : input;
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
            id={card.gameChatRoom.id}
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
