import React, { useState } from 'react';
import { translateText } from '../../services/game.service';
import classes from './Game.module.scss';

export function Game(): JSX.Element {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ id: 0, content: '' }]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const translatedInput = await translateText(input);
    console.log('game.txs file', translatedInput);
    addMessage({
      id: Math.random(),
      content: translatedInput.translatedContent,
    });
    setInput('');
  };

  const changeHandler = (e: any) => {
    const value = e.target.value;
    setInput(value);
  };

  const addMessage = (message: { id: number; content: string }) => {
    setMessages((prevMessages) => {
      let newMessages: { id: number; content: string }[] = [];
      newMessages = [...prevMessages, message];
      return newMessages;
    });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          className={classes.input}
          type="text"
          onChange={changeHandler}
          value={input}
        />
        <button className={classes.btn} type="submit">
          SEND
        </button>
      </form>
      <div className={classes.messages}>
        {messages.map((m) => (
          <div key={m.id} className="message">
            {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
