import React, { ChangeEvent, FormEvent, useState } from 'react';
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

import { translateText } from '../../services/game.service';
import classes from './Game.module.scss';

export function Game(): JSX.Element {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 0, content: '', date: new Date().toISOString() },
  ]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const translatedInput = await translateText(input);
    console.log('game.txs file', translatedInput);
    setInput('');
    if (translatedInput) {
      addMessage({
        id: translatedInput.id,
        date: translatedInput.createdAt,
        content: translatedInput.translatedContent,
      });
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const addMessage = (message: {
    id: number;
    content: string;
    date: string;
  }) => {
    setMessages((prevMessages) => {
      let newMessages: { id: number; content: string; date: string }[] = [];
      newMessages = [...prevMessages, message].sort((a, b) =>
        a.date > b.date ? 0 : 1,
      );
      return newMessages;
    });
  };

  const formatDate = (date: string) => {
    const newDate = moment(date);
    return newDate.fromNow();
  };

  const topicHandler = () => {
    console.log('click');
  };

  return (
    <div className={classes.container}>
      <header className={classes.header__container}>
        <div className={classes.header__title__container}>
          <h1 className={classes.header__title}>Grand Theft Auto V</h1>
        </div>
        <Button variant="contained" type="submit" color="primary">
          Add to favorit
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
                        F
                      </Avatar>
                    }
                    title="Francis"
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
                      aria-label="add to favorites"
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

export default Game;
