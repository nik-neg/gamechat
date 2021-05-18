import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import io from 'socket.io-client';
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

import PropTypes from 'prop-types';

import {
  fetchAllMessagesFromChatRoom,
  generateMessage,
  // translateAllMessages,
  // translateMessage,
} from '../../services/message.service';
import classes from './Game.module.scss';
import { fetchGames } from '../../store/reducers/games';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { matchPath, match } from 'react-router';
import { fetchGamers } from '../../store/reducers/gamers';
import Game from '../../interfaces/game';
import { getDefaultWatermarks } from 'istanbul-lib-report';
import Spinner from '../Spinner/Spinner';
// import Message from '../../interfaces/message';

// import { socket } from '../../services/socket.service';
import { fetchOneGamerById } from '../../store/reducers/auth';

//const url = process.env.REACT_APP_SERVER_BASE_URL ?? '';

// export function GameChat({ match }: any): JSX.Element {
//   const initialGameInfo: Game = {
//     id: 0,
//     apiId: 0,
//     title: '',
//     genreList: [{ id: '', name: '' }],
//     dominantGenre: { id: '', name: '' },
//     releaseDate: '',
//     imagesPath: { cover: '', screenshots: [''] },
//     consoles: [],
//     ageRating: '',
//     description: '',
//     gameChatRoom: [0],
//   };
//   const [gameInfo, setGameInfo] = useState(initialGameInfo);

const url = process.env.REACT_APP_SERVER_BASE_URL ?? '';

export function GameChat({ match }: any): JSX.Element {
  const initialGameInfo: Game = {
    id: 0,
    apiId: 0,
    title: '',
    genreList: [{ id: '', name: '' }],
    dominantGenre: { id: '', name: '' },
    releaseDate: '',
    imagesPath: { cover: '', screenshots: [''] },
    consoles: [],
    ageRating: '',
    description: '',
    gameChatRoom: [0],
  };
  const [gameInfo, setGameInfo] = useState(initialGameInfo);

  const [socket, setSocket] = useState(io(url));

  useEffect(() => {
    // listener
    let translatedInputOtherUser = '';
    socket.on('gamechat', (msg) => {
      translatedInputOtherUser = msg;
      setInput('');
      addMessage({
        id: 1,
        content: translatedInputOtherUser,
        date: new Date().toISOString(),
      });
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const [input, setInput] = useState('');

  const { roomId } = match.params;

  const gameReducer = useAppSelector((state) => state.games);
  const gamer = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState([
    { id: 0, content: '', date: new Date().toISOString() },
  ]);

  const info = gameReducer.entities[roomId];

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('roomId :>> ', roomId);

    if (!gameReducer.ids.length) dispatch(fetchGames());
    //dispatch(fetchGamers());
    fetchAllMessagesFromChatRoom('1');
    setGameInfo(info);
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) dispatch(fetchOneGamerById(userId));
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || '0';
    console.log('gamer.language :>> ', gamer.language);
    const gM = await generateMessage(+userId, '1', input, gamer.language); // gamer.language doesnt work
    let translatedInputUser = '';
    if (gM) {
      console.log('if', gM);
      translatedInputUser = gM.translatedContent[gamer.language]; //await translateAllMessages();
    }
    // console.log('game.txs file', translatedInput);
    // setInput('');
    // if (translatedInput) {
    //   setTranslatedInput(translatedInput);
    //   console.log('object');
    //   emmitMessage();
    //   //      socket.emit(`gamechat`, translatedInput);
    //   addMessage({
    //     id: 1,
    //     content: translatedInput,
    //     date: new Date().toISOString(),
    //   });
    //   translatedInputUser = gM.translatedContent['FR'];
    // }
    socket.emit(`gamechat`, translatedInputUser);
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
  if (gameInfo && gameInfo.title) {
    console.log('gameInfo.imagesPath.cover :>> ', gameInfo.imagesPath.cover);
    return (
      <div className={classes.container}>
        <header
          className={classes.header__container}
          style={{
            backgroundImage: `url(
              ${gameInfo.imagesPath.cover}
            )`,
          }}
        >
          <div className={classes.header__title__container}>
            <h1 className={classes.header__title}>{gameInfo.title}</h1>
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
                  <Card
                    key={m.id}
                    classes={{ root: classes.message__container }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          classes={{
                            colorDefault:
                              classes['message__avatar-colorDefault'],
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
  return <Spinner />;
}

GameChat.propTypes = {
  match: PropTypes.object,
};

export default GameChat;
