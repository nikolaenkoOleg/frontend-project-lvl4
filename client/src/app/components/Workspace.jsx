import React from 'react';

export default class Workspace extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className="col h-100">
        <div className="d-flex flex-column h-100">{children}</div>
      </div>
    );
  }
}
