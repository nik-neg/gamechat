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
} from '../../services/message.service';
import classes from './Game.module.scss';
import { fetchGames } from '../../store/reducers/games';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Game from '../../interfaces/game';

import Spinner from '../Spinner/Spinner';

import {
  toggleChatRoomToFavouriteList,
  fetchOneGamerById,
} from '../../store/reducers/auth';

const url = process.env.REACT_APP_SERVER_BASE_URL ?? '';
export function GameChat({ match }: any): JSX.Element {
  const [gameInfo, setGameInfo] = useState<Game | undefined>(undefined);
  const [socket, setSocket] = useState(io(url));
  const [input, setInput] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const gameReducer = useAppSelector((state) => state.games);
  const gamer = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState([
    { id: 0, content: '', date: new Date().toISOString() },
  ]);

  const { roomId } = match.params;
  const info = gameReducer.entities[roomId];

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const list: { id: number }[] = gamer.favouriteGameChats || [];
    const isFav = list.findIndex((fav) => fav.id === parseInt(roomId));
    setIsFavourite(isFav !== -1);
  }, [roomId, isFavourite]);

  useEffect(() => {
    if (!gameReducer.ids.length) dispatch(fetchGames());
    getAllMessages();
    setGameInfo(info);
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) dispatch(fetchOneGamerById(userId));
  }, []);

  const toggleToFavouriteHandler = () => {
    const list: { id: number }[] = gamer.favouriteGameChats || [];
    let favouriteGameChats;
    if (isFavourite) {
      favouriteGameChats = list.filter((fav) => fav.id !== parseInt(roomId));
    } else {
      favouriteGameChats = [...list, { id: parseInt(roomId) }];
    }
    dispatch(
      toggleChatRoomToFavouriteList({
        userId: gamer.id,
        favouriteGameChats,
      }),
    );
    // TypeError: can't define array index property past the end of an array with non-writable length
  };

  const getAllMessages = async () => {
    const oldMessages = await fetchAllMessagesFromChatRoom(roomId);
    if (oldMessages.length)
      setMessages(
        oldMessages.map((m) => ({
          ...m,
          content: m.translatedContent[gamer.language],
          date: m.updatedAt,
        })),
      );
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || '0';
    const gM = await generateMessage(+userId, roomId, input, gamer.language); // gamer.language doesnt work
    let translatedInputUser = '';
    if (gM) {
      console.log('if', gM);
      translatedInputUser = gM.translatedContent[gamer.language]; //await translateAllMessages();
    }
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
        a.date > b.date ? 0 : 1,
      );
      return newMessages;
    });
  };

  if (gameInfo && gameInfo.title) {
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
            onClick={toggleToFavouriteHandler}
          >
            {`${isFavourite ? 'Remove from ' : 'Add to '}favourites`}
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
                      title={`${gamer.firstName} ${gamer.lastName}`} // gamer ? `${gamer.firstName} ${gamer.lastName}`: ''
                      subheader={formatDate(m.date)}
                      classes={{ content: classes.message__header }}
                    />
                    <CardContent
                      classes={{
                        root: classes.car__content,
                      }}
                    >
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
                  <span>23</span>
                </div>
                <div className={classes.topic__item} onClick={topicHandler}>
                  <h3>Question</h3>
                  <span>8</span>
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
