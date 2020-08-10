import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { changeChannel, openModal as openModalAction } from '../actions';

import Add from './modals/Add';
import Rename from './modals/Rename';
import Delete from './modals/Delete';

const mapStateToProps = (state) => {
  const {
    channelsState: { channels, currentChannelId },
    modalsState: { addModalIsShow, renameModalIsShow, deleteModalIsShow },
  } = state;
  const sortedChannels = channels.slice().sort((a, b) => a.id - b.id);

  return {
    channels: sortedChannels,
    currentChannelId,
    addModalIsShow,
    renameModalIsShow,
    deleteModalIsShow,
  };
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

  addModalHandle = () => {
    const { openModal } = this.props;
    openModal('addModal');
  }

  renameModalHandle = () => {
    const { openModal } = this.props;
    openModal('renameModal');
  }

  deleteModalHandle = () => {
    const { openModal } = this.props;
    openModal('deleteModal');
  }

  render() {
    const {
      channels,
      currentChannelId,
      addModalIsShow,
      renameModalIsShow,
      deleteModalIsShow,
    } = this.props;

    const addModal = addModalIsShow ? (<Add />) : null;
    const renameModal = renameModalIsShow ? (<Rename />) : null;
    const deleteModal = deleteModalIsShow ? (<Delete />) : null;

    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto" onClick={this.addModalHandle}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" className="btn btn-link p-0 ml-4" onClick={this.deleteModalHandle}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button type="button" className="btn btn-link p-0 ml-4" onClick={this.renameModalHandle}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          {addModal}
          {renameModal}
          {deleteModal}
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
