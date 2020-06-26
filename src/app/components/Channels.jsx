import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { changeChannel, setWebSoketAction } from '../actions';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;

  return { channels, currentChannelId };
};

const mapDispatchToProps = {
  setNewActiveChannel: changeChannel,
  setWebSoketByChannel: setWebSoketAction,
};

class Channels extends React.PureComponent {
  handleSetActive = (id) => () => {
    const { setNewActiveChannel } = this.props;
    setNewActiveChannel({ id });
    setWebSoketByChannel({ id });
  }

  render() {
    const { channels, currentChannelId } = this.props;

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
                    active: id === currentChannelId,
                  })}
                  onClick={this.handleSetActive(id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
