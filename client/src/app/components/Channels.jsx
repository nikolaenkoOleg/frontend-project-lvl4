import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { changeChannel, openModal as openModalAction } from '../actions';
import Portal from './modals/Portal';
import Add from './modals/Add';
import Edit from './modals/Rename';
import Delete from './modals/Delete';

const mapStateToProps = (state) => {
  const {
    channelsState: { channels, currentChannelId },
    modalsState: { addModalState, editModalState, deleteModalState },
  } = state;

  const sortedChannels = channels.slice().sort((a, b) => a.id - b.id);

  return {
    channels: sortedChannels,
    currentChannelId,
    addModalState,
    editModalState,
    deleteModalState,
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

  addNewChannelHandle = () => {
    const { openModal } = this.props;
    openModal('add');
  }

  editModalHandle = () => {
    const { openModal } = this.props;
    openModal('edit');
  }

  deleteModalHandle = () => {
    const { openModal } = this.props;
    openModal('delete');
  }

  getModalByState = () => {
    const { addModalState, editModalState, deleteModalState } = this.props;
    let modal;
    let result;

    if (addModalState) {
      modal = <Add />;
    }

    if (editModalState) {
      modal = <Edit />;
    }

    if (deleteModalState) {
      modal = <Delete />;
    }

    if (modal) {
      result = (
        <>
          <div className="fade modal-backdrop show" />
          <Portal>
            {modal}
          </Portal>
        </>
      );

      return result;
    }

    return null;
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const modal = this.getModalByState();

    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto" onClick={this.addNewChannelHandle}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" className="btn btn-link p-0 ml-4" onClick={this.deleteModalHandle}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button type="button" className="btn btn-link p-0 ml-4" onClick={this.editModalHandle}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          {modal}
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
