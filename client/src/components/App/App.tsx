import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';

import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Game from '../Game/Game';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOneGamerById } from '../../store/reducers/auth';
import Auth from '../Auth/Auth';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState('');
  const authReducer = useAppSelector((state) => state.auth);
  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    setUserId(userId);
    if (userId) dispatch(fetchOneGamerById(userId));
  }, []);

  let routes;
  if (userId) {
    routes = (
      <Layout>
        <Switch>
          <Route path="/user/:id" component={Profile} />
          <Route path="/gamechat/:roomId" component={Game} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return <>{routes}</>;
};

export default App;
