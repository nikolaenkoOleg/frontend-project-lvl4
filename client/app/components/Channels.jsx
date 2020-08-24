import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { changeChannel, openModal } from '../actions';

import Add from './modals/Add';
import Rename from './modals/Rename';
import Delete from './modals/Delete';

export default () => {
  const store = useSelector((state) => {
    const {
      channelsState: { channels, currentChannelId },
      modalsState: { addingModalIsShow, renamingModalIsShow, deletingModalIsShow },
    } = state;

    const sortedChannels = channels.slice().sort((a, b) => a.id - b.id);

    return {
      channels: sortedChannels,
      currentChannelId,
      addingModalIsShow,
      renamingModalIsShow,
      deletingModalIsShow,
    };
  });

  const dispatch = useDispatch();

  const setActiveChannelHandler = (id) => () => {
    dispatch(changeChannel({ id }));
  };

  const callAddModal = () => {
    dispatch(openModal('addingModal'));
  };

  const callDeleteModal = () => {
    dispatch(openModal('deletingModal'));
  };

  const callRenameModal = () => {
    dispatch(openModal('renamingModal'));
  };

  const {
    addingModalIsShow,
    renamingModalIsShow,
    deletingModalIsShow,
    channels,
    currentChannelId,
  } = store;

  const addingModal = addingModalIsShow ? (<Add />) : null;
  const renamingModal = renamingModalIsShow ? (<Rename />) : null;
  const deletingModal = deletingModalIsShow ? (<Delete />) : null;

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={callAddModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button type="button" className="btn btn-link p-0 ml-4" onClick={callDeleteModal}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button type="button" className="btn btn-link p-0 ml-4" onClick={callRenameModal}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {addingModal}
        {renamingModal}
        {deletingModal}
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li className="nav-item" key={id}>
            <button
              type="button"
              className={cn({
                'nav-link': true,
                btn: true,
                'btn-block': true,
                active: id === currentChannelId,
              })}
              key={id}
              onClick={setActiveChannelHandler(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
