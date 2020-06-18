import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { actions } from '../slices/channelSlices';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;

  return { channels, currentChannelId };
};

const actionCreators = {
  changeActiveChannel: actions.changeActiveChannel,
};

class Channels extends React.PureComponent {
  handleSetActive = (id) => () => {
    const { changeActiveChannel } = this.props;
    changeActiveChannel({ id });
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

export default connect(mapStateToProps, actionCreators)(Channels);
