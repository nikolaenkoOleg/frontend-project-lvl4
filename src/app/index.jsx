import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './components/Channels';


export default (channels) => {
  ReactDOM.render(
    <Channels channels={channels} />,
    document.querySelector('.container'),
  );
};
