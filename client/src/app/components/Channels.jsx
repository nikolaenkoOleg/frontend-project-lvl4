import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

import { changeChannel, openModal as openModalAction } from '../actions';
import Portal from './modals/Portal.jsx';
import Add from './modals/Add';

const mapStateToProps = (state) => {
  const { channelsState: { channels, currentChannelId }, modalState: { isShow } } = state;

  return { channels, currentChannelId, isShow };
};

const mapDispatchToProps = {
  setNewActiveChannel: changeChannel,
  openModal: openModalAction,
};

class Channels extends React.PureComponent {
  setActiveChannelHandle = (id) => () => {
    const { setNewActiveChannel } = this.props;
    setNewActiveChannel({ id });
  }

  addNewChannelHandle = () => {
    const { openModal } = this.props;
    openModal();
  }

  render() {
    const { channels, currentChannelId, isShow } = this.props;
    const addModal = isShow ? (
      <>
        <div className="fade modal-backdrop show" />
        <Portal>
          <Add />
        </Portal>
      </>
    ) : null;

    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto" onClick={this.addNewChannelHandle}>+</button>
          {addModal}
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
                  onClick={this.setActiveChannelHandle(id)}
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
