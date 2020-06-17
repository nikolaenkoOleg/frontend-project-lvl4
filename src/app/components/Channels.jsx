import React from 'react';
import cn from 'classnames';

export default class Channels extends React.PureComponent {
  render() {
    const { channels, currentChannel } = this.props;

    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto">+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels.map(({ id, name }) => (
            <React.Fragment key={id}>
              <li className="nav-item">
                <button
                  type="button"
                  className={cn({
                    'nav-link': true,
                    btn: true,
                    'btn-block': true,
                    active: id === currentChannel,
                  })}
                >
                  {name}
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }
}
