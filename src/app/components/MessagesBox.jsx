import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchMessages } from '../actions';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const currentChannelMessages = messages.filter(({ channelId }) => currentChannelId === channelId);
  const props = {
    messages: currentChannelMessages,
  };

  return props;
};

const mapDispatchToProps = {
  fetchMessages,
};

class MessagesBox extends React.PureComponent {
  render() {
    const { messages } = this.props;

    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {
          messages.map(({ message: { author, text } }) => (
            <React.Fragment key={_.uniqueId()}>
              <div>
                <React.Fragment key={_.uniqueId()}>
                  <b>{author}</b>
                  {': '}
                  {text}
                </React.Fragment>
              </div>
            </React.Fragment>
          ))
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBox);
