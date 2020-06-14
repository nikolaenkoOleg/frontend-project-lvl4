import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';
import Channels from './components/Channels';
import Workspace from './components/Workspace';
import MessagesBox from './components/MessagesBox';
import InputField from './components/InputField';


export default (channels) => {
  ReactDOM.render(
    <Container>
      <Channels channels={channels} />
      <Workspace>
        <MessagesBox />
        <InputField />
      </Workspace>
    </Container>,
    document.querySelector('.container'),
  );
};
