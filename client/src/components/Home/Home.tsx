import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
import io from 'socket.io-client';
import classes from './Home.module.scss';
import Wrapper from '../Vue/Wrapper';

const url = process.env.REACT_APP_SERVER_BASE_URL ?? '';

const Home = (): JSX.Element => {
  const [msgServer, setMsgServer] = useState('');
  const [msg, setMsg] = useState('');
  // const [socket, setsocket] = useState(io(url ? url : ''));
  const [messages, setMessages] = useState(['']);

  useEffect(() => {
    console.log(url);
    const socket = io(url);
    console.log(socket);

    socket.on('connect', () => {
      console.log('Connected!');
      socket.emit('msgToServer', 'client data');
    });

    // socket.on('msgToServer', function (msgToServer: any) {
    //   console.log('Connection to server established. SocketID is', msgToServer);
    //   socket.emit('msgToClient', JSON.stringify('client data'));
    // });
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(url);
    const socket = io('http://localhost:3000', { path: url });
    console.log(socket.connect());
    console.log(socket);

    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    // socket.on('msgToServer', function (msgToServer: any) {
    //   console.log('Connection to server established. SocketID is', msgToServer);
    //   socket.emit('msgToClient', 'client data');
    // });
  }

  // function sendMsgToServer(event: any) {
  //   event.preventDefault();
  //   socket.emit('msgToServer', msg);
  // }

  // function receiveMsgFromServer() {
  //   console.log('Receiving message');
  //   socket.on('msgToClient', (message: string) => {
  //     setMsgServer(message);
  //     setMessages((prevState) => [...prevState, message]);
  //     console.log(message);
  //   });
  // }

  // function sendMessage() {
  //   if (msg) {
  //     socket.emit('msgToServer', msg);
  //     setMsg('');
  //   }
  // }

  // function receivedMessage(message: string) {
  //   setMessages((prevState) => [...prevState, message]);
  // }

  // function created() {
  //   // const socket = io('http://localhost:3000');
  //   socket.on('msgToClient', (message: string) => {
  //     receivedMessage(message);
  //   });
  // }

  return (
    <div>
      {/* <Wrapper /> */}
      {/* <script
        type="text/javascript"
        src="https://cdn.socket.io/socket.io-1.4.5.js"
      ></script>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      Home
      <form onSubmit={(event) => handleSubmit(event)}>
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
      <p>{msgServer}</p> */}
    </div>
  );
};

export default Home;
