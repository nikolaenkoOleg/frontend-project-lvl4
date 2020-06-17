import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Container from './components/Container';
import Channels from './components/Channels';
import Workspace from './components/Workspace';
import MessagesBox from './components/MessagesBox';
import InputField from './components/InputField';

import redusers from './redusers';

const store = configureStore({
  reducer: redusers,
});

export default (data) => {
  const { channels, currentChannelId } = data;

  render(
    <Provider store={store}>
      <Container>
        <Channels channels={channels} currentChannel={currentChannelId} />
        <Workspace>
          <MessagesBox />
          <InputField />
        </Workspace>
      </Container>
    </Provider>,
    document.querySelector('.container'),
  );
};
