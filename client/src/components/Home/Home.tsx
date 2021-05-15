import React, { useState } from 'react';
import { io } from 'socket.io-client';
import classes from './Home.module.scss';

const url = process.env.REACT_APP_SERVER_BASE_URL;

const Home = (): JSX.Element => {
  const [msgServer, setMsgServer] = useState('');
  const [msg, setMsg] = useState('');
  const [socket, setsocket] = useState(io(url ? url : ''));
  const [messages, setMessages] = useState(['']);

  function sendMsgToServer(event: any) {
    event.preventDefault();
    socket.emit('msgToServer', msg);
  }

  function receiveMsgFromServer() {
    console.log('Receiving message');
    socket.on('msgToClient', (message: string) => {
      setMsgServer(message);
      setMessages((prevState) => [...prevState, message]);
      console.log(message);
    });
  }

  return (
    <div>
      Home
      <form onSubmit={sendMsgToServer}>
        <input value={msg} onChange={(e) => setMsg(e.target.value)}></input>
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <p>{msg}</p>
          </li>
        ))}
      </ul>
      <p>{msgServer}</p>
    </div>
  );
};

export default Home;
