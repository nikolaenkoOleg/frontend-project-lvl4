import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import coockies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import i18next from 'i18next';

import App from './components/App';

import rootReducer from './slises';
import { UserProvider } from './context';
import * as actions from './actions';
import en from './locales/en';

export default (gon) => {
  i18next.init({
    lng: 'en',
    resources: {
      en,
    },
  });

  const userName = coockies.get('userName') || faker.name.findName();
  coockies.set('userName', userName);

  const socket = io();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      messagesState: {
        messages: gon.messages,
      },
      channelsState: {
        channels: gon.channels,
        currentChannelId: gon.currentChannelId,
      },
    },
  });

  socket.on('newMessage', ({ data: { attributes } }) => store.dispatch(actions.addMessage(attributes)));
  socket.on('newChannel', ({ data: { attributes } }) => store.dispatch(actions.addChannel(attributes)));
  socket.on('renameChannel', ({ data: { attributes } }) => store.dispatch(actions.renameChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => store.dispatch(actions.deleteChannel(id)));

  render(
    <Provider store={store}>
      <UserProvider value={coockies.get('userName')}>
        <App />
      </UserProvider>
    </Provider>,
    document.querySelector('.container'),
  );
};
