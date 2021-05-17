import React from 'react';
import './main.js';
import message from './main.js';
import app from './main.js';

export default function wrapper() {
  return (
    <div id="app" className="container">
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script
        type="text/javascript"
        src="https://cdn.socket.io/socket.io-1.4.5.js"
      ></script>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <h1 className="text-center">Hello</h1>
          <br />
          <div id="status"></div>
          <div id="chat">
            <input
              type="text"
              v-model="name"
              id="username"
              className="form-control"
              placeholder="Enter name..."
            />
            <br />
            <div className="card">
              <div id="messages" className="card-block">
                <ul>
                  <li v-for="message of messages">{''}</li>
                </ul>
              </div>
            </div>
            <br />
            <textarea
              id="textarea"
              className="form-control"
              v-model="text"
              placeholder="Enter message..."
            ></textarea>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

<script src="main.js"></script>;
