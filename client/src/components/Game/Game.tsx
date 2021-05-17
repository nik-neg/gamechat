import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
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
} from '../../services/game.service';
import classes from './Game.module.scss';
// import Message from '../../interfaces/message';

import io from 'socket.io-client';

const url = process.env.REACT_APP_SERVER_BASE_URL ?? '';

export function Game(): JSX.Element {
  //   useEffect(() => {
  //     const socket = io(url);
  //     console.log(socket);

  //     socket.on('connect', () => {
  //       console.log('Connected!');
  //       socket.emit('gamechat', 'client data');
  //     });

  //     socket.on('gamechat', (msg) => {
  //       console.log(msg);
  //     });

  //     // socket.on('msgToServer', function (msgToServer: any) {
  //     //   console.log('Connection to server established. SocketID is', msgToServer);
  //     //   socket.emit('msgToClient', JSON.stringify('client data'));
  //     // });
  //   }, []);

  const [input, setInput] = useState('');
  const [gamer, setGamer] = useState({
    firstName: 'FirstName',
    lastName: 'LastName',
    language: 'FR',
  });
  const [messages, setMessages] = useState([
    { id: 0, content: '', date: new Date().toISOString() },
  ]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const gM = await generateMessage(input, 'FR'); // for databse update and api call
    let translatedInputUser = '';
    if (gM) {
      setGamer(gM.gamer);
      console.log('if', gM);
      translatedInputUser = gM.translatedContent['FR'];
    }

    // sockets send to update the chat room
    let translatedInputOtherUser = '';
    const socket = io(url);
    await socket.on('connect', () => {
      console.log('Connected!');
      socket.emit(`gamechat`, translatedInputUser);
      // socket.broadcast.send('gamechat', translatedInput);
    });
    // sockets receive
    await socket.on('gamechat', (msg) => {
      console.log('new from other user', translatedInputUser);
      translatedInputOtherUser = msg;
      setInput('');
      if (translatedInputUser !== translatedInputOtherUser) {
        addMessage({
          id: 1,
          content: translatedInputOtherUser,
          date: new Date().toISOString(),
        });
      }
    });

    console.log('game.txs file', translatedInputUser);
    setInput('');
    if (translatedInputUser) {
      addMessage({
        id: 1,
        content: translatedInputUser,
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
          <h1 className={classes.header__title}>Grand Theft Auto V</h1>
        </div>
        <Button variant="contained" type="submit" color="primary">
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

export default Game;
