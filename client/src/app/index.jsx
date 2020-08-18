import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import coockies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';

import App from './components/App';

import rootReducer from './slises';
import { UserProvider } from './context';
import * as actions from './actions';

export default (gon) => {
  coockies.set('user', faker.name.findName());
  const user = coockies.get('user');

  const socket = io();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      messagesState: {
        messages: gon.messages,
        sendMessageState: 'none',
      },
      channelsState: {
        channels: gon.channels,
        currentChannelId: gon.currentChannelId,
        addingChannelState: 'none',
      },
    },
  });

  socket.on('newMessage', (data) => store.dispatch(actions.loadMessagesAction(data)));
  socket.on('newChannel', (data) => store.dispatch(actions.getChannels(data)));
  socket.on('renameChannel', (data) => store.dispatch(actions.fetchChannels(data)));
  socket.on('removeChannel', (data) => store.dispatch(actions.deleteChannel(data)));

  render(
    <Provider store={store}>
      <UserProvider value={user}>
        <App />
      </UserProvider>
    </Provider>,
    document.querySelector('.container'),
  );
};
