import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

import InpitField from './InputField';

export default () => {
  const { messages } = useSelector((state) => state.messagesState);
  const { currentChannelId } = useSelector((state) => state.channelsState);
  const filteredMessages = messages.filter(({ channelId }) => currentChannelId === channelId);

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {
            filteredMessages.map(({ message: { author, text } }) => (
              <div key={uniqueId()}>
                <b>{author}</b>
                {': '}
                {text}
              </div>
            ))
          }
        </div>
        <InpitField />
      </div>
    </div>
  );
};
