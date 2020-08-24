import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

import InpitField from './InputField';

export default () => {
  const store = useSelector((state) => {
    const {
      messagesState: { messages },
      channelsState: { currentChannelId },
    } = state;

    const currentChannelMessages = messages
      .filter(({ channelId }) => currentChannelId === channelId);

    return { messages: currentChannelMessages };
  });
  const { messages } = store;

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {
            messages.map(({ message: { author, text } }) => (
              <React.Fragment key={uniqueId()}>
                <div>
                  <React.Fragment key={uniqueId()}>
                    <b>{author}</b>
                    {': '}
                    {text}
                  </React.Fragment>
                </div>
              </React.Fragment>
            ))
          }
        </div>
        <InpitField />
      </div>
    </div>
  );
};
