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

import rootReduser from './slises';
import { UserProvider } from './context';
import * as actions from './actions';

export default (gon) => {
  coockies.set('user', faker.name.findName());
  const user = coockies.get('user');

  const socket = io('ws://localhost:5000');

  const store = configureStore({
    reducer: rootReduser,
    preloadedState: {
      messagesState: {
        messages: gon.messages,
        sendMessageState: 'none',
      },
      channelsState: {
        channels: gon.channels,
        currentChannelId: gon.currentChannelId,
      },
      modalState: {
        isShow: false,
      },
    },
  });

  socket.on('newMessage', (data) => {
    store.dispatch(actions.getMessagesAction(data));
  });

  render(
    <Provider store={store}>
      <Container>
        <Channels />
        <Workspace>
          <MessagesBox />
          <UserProvider value={user}>
            <InputField />
          </UserProvider>
        </Workspace>
      </Container>
    </Provider>,
    document.querySelector('.container'),
  );
};
