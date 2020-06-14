import React from 'react';

export default class MessagesBox extends React.PureComponent {
  render() {
    const { messages } = this.props;

    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-3">{messages}</div>
    );
  }
}
