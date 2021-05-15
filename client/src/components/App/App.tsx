import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../Auth/Login/Login';
import Game from '../Game/Game';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

import classes from './App.module.scss';

function App(): JSX.Element {
  const routes = (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/user/:id" component={Profile} />
      <Route path="/gamechat/:id" component={Game} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
  return <div className={classes.App}>{routes}</div>;
}

export default App;
