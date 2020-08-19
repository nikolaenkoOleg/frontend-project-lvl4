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
  });

  const dispatch = useDispatch();

  const setActiveChannelHandle = (id) => () => {
    dispatch(changeChannel({ id }));
  };

  const addModalHandle = () => {
    dispatch(openModal('addModal'));
  };

  const renameModalHandle = () => {
    dispatch(openModal('renameModal'));
  };

  const deleteModalHandle = () => {
    dispatch(openModal('deleteModal'));
  };

  const {
    addModalIsShow,
    renameModalIsShow,
    deleteModalIsShow,
    channels,
    currentChannelId,
  } = store;

  const addModal = addModalIsShow ? (<Add />) : null;
  const renameModal = renameModalIsShow ? (<Rename />) : null;
  const deleteModal = deleteModalIsShow ? (<Delete />) : null;

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={addModalHandle}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button type="button" className="btn btn-link p-0 ml-4" onClick={deleteModalHandle}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button type="button" className="btn btn-link p-0 ml-4" onClick={renameModalHandle}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {addModal}
        {renameModal}
        {deleteModal}
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
              onClick={setActiveChannelHandle(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
