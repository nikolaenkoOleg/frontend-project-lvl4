import React from 'react';

export default class Container extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="h-100" id="chat">
        <div className="row h-100 pb-3">{children}</div>
      </div>
    );
  }
}
