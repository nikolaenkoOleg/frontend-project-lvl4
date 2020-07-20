import React from 'react';

export default class Loader extends React.PureComponent {
  render() {
    const { show } = this.props;
    return show ? (
      <div className="spinner-border ml-2 mt-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : null;
  }
}
