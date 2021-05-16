import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';

import {
  generateMessage,
  // translateAllMessages,
  // translateMessage,
} from '../../services/message.service';
import classes from './Game.module.scss';
import { fetchGames } from '../../store/reducers/games';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { matchPath, match } from 'react-router';
// import Message from '../../interfaces/message';

export function Game({ match }: any): JSX.Element {
  //const [gameInfo, setGameInfo] = useState()
  const [input, setInput] = useState('');
  const [gamer, setGamer] = useState({
    firstName: 'FirstName',
    lastName: 'LastName',
    language: 'FR',
  });
  const { gameId } = match.params;

  const gameInfo = useAppSelector((state) => state.games.entities[gameId]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('gameId :>> ', gameId);
    dispatch(fetchGames());
  }, [dispatch]);

  const [messages, setMessages] = useState([
    { id: 0, content: '', date: new Date().toISOString() },
  ]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const gM = await generateMessage(input, 'FR'); // gamer.language doesnt work
    let translatedInput = '';
    if (gM) {
      setGamer(gM.gamer);
      console.log('if', gM);
      translatedInput = gM.translatedContent['FR']; //await translateAllMessages();
    }
    console.log('game.txs file', translatedInput);
    setInput('');
    if (translatedInput) {
      console.log('object');
      addMessage({
        id: 1,
        content: translatedInput,
        date: new Date().toISOString(),
      });
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const formatDate = (date: string) => {
    const newDate = moment(date);
    return newDate.fromNow();
  };

  const getInitial = () => {
    return `${gamer.firstName} ${gamer.lastName}`.split(' ').map((n) => n[0]);
  };

  const topicHandler = () => {
    console.log('click');
  };

  const addMessage = (message: {
    id: number;
    content: string;
    date: string;
  }) => {
    setMessages((prevMessages) => {
      let newMessages: { id: number; content: string; date: string }[] = [];
      newMessages = [...prevMessages, message].sort((a, b) =>
        a.date < b.date ? 0 : 1,
      );
      return newMessages;
    });
  };

  return (
    <div className={classes.container}>
      <header className={classes.header__container}>
        <div className={classes.header__title__container}>
          <h1 className={classes.header__title}>{'gameInfo.title'}</h1>
        </div>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          classes={{
            root: classes.btn,
          }}
        >
          Add to favourites
        </Button>
      </header>
      <main className={classes.main}>
        <section className={classes['chat-section']}>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              id="filled-basic"
              multiline
              label="message"
              variant="filled"
              value={input}
              onChange={changeHandler}
              classes={{
                root: classes.form__input__container,
              }}
            />
            <Button variant="contained" type="submit" color="primary">
              Send
            </Button>
          </form>
          <section className={classes.messages}>
            {messages
              .filter((m) => m.content)
              .map((m) => (
                <Card key={m.id} classes={{ root: classes.message__container }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        classes={{
                          colorDefault: classes['message__avatar-colorDefault'],
                        }}
                      >
                        {gamer ? getInitial() : ''}
                      </Avatar>
                    }
                    title={'Tesuser'} // gamer ? `${gamer.firstName} ${gamer.lastName}`: ''
                    subheader={formatDate(m.date)}
                    classes={{ content: classes.message__header }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      component="p"
                    >
                      {m.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="add to favourites"
                      classes={{
                        root: classes.message__icon__button,
                        label: classes.message__icon__svg,
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
          </section>
        </section>
        <section className={classes['topic-section']}>
          <div className={classes.topic__container}>
            <h1 className={classes.topic__title}>Topic</h1>
            <div className={classes.topic__main}>
              <div className={classes.topic__item} onClick={topicHandler}>
                <h3>Discussion</h3>
                <span>0</span>
              </div>
              <div className={classes.topic__item} onClick={topicHandler}>
                <h3>Question</h3>
                <span>0</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

Game.propTypes = {
  match: PropTypes.object,
};

export default Game;
