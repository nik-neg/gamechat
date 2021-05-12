import React from 'react';
import Game from '../Game/Game';
import classes from './App.module.scss';

function App(): JSX.Element {
  return (
    <div className={classes.App}>
      <Game />
    </div>
  );
}

export default App;
