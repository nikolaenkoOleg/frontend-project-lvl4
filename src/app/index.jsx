import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import coockies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';

import Container from './components/Container';
import Channels from './components/Channels';
import Workspace from './components/Workspace';
import MessagesBox from './components/MessagesBox';
import InputField from './components/InputField';

import reducer from './redusers';

export default (initialState) => {
  coockies.set('user', faker.name.findName());

  const store = configureStore({
    reducer,
    preloadedState: initialState,
  });

  const socket = io({
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log(socket.connected);
  });

  // const messagesSocket = io('https:localhost:5000', {
  //   path: '/api/v1/channels/1/messages',
  // });

  render(
    <Provider store={store}>
      <Container>
        <Channels />
        <Workspace>
          <MessagesBox />
          <InputField />
        </Workspace>
      </Container>
    </Provider>,
    document.querySelector('.container'),
  );
};
