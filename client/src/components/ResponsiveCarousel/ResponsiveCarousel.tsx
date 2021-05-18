import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Game from '../../interfaces/game';

import classes from './ResponsiveCarousel.module.scss';

const DemoCarousel = ({ cards }: any) => {
  const tag = document.querySelector('.carousel-status');
  if (tag) tag.textContent = '';
  return (
    <Carousel showStatus={false}>
      {cards.map((card: Game) => (
        <div key={card.id} className={classes.image__container}>
          <img
            src={card.imagesPath.cover}
            className={classes.image}
            alt={card.title}
          />

          <h2 className={classes.legend}>{card.title}</h2>
        </div>
      ))}
    </Carousel>
  );
};

DemoCarousel.propTypes = {
  cards: PropTypes.array,
};

export default DemoCarousel;
