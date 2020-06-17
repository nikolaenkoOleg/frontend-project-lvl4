import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';
import Channels from './components/Channels';
import Workspace from './components/Workspace';
import MessagesBox from './components/MessagesBox';
import InputField from './components/InputField';


export default (data) => {
  const { channels, currentChannelId } = data;
  ReactDOM.render(
    <Container>
      <Channels channels={channels} currentChannel={currentChannelId} />
      <Workspace>
        <MessagesBox />
        <InputField />
      </Workspace>
    </Container>,
    document.querySelector('.container'),
  );
};
