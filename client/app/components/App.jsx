import React from 'react';

import Channels from './Channels';
import MessagesBox from './MessagesBox';

export default () => (
  <div className="h-100" id="chat">
    <div className="row h-100 pb-3">
      <Channels />
      <MessagesBox />
    </div>
  </div>
);
