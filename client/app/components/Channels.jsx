import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { changeChannel, openModal } from '../actions';

import getModal from './modals';

export default () => {
  const { type, status } = useSelector((state) => state.modalsState);
  const { channels } = useSelector((state) => state.channelsState);
  const { currentChannelId } = useSelector((state) => state.channelsState);

  const sortedChannels = channels.slice().sort((a, b) => a.id - b.id);

  const dispatch = useDispatch();

  const renderModal = (modalType) => {
    if (!modalType) {
      return null;
    }

    const Modal = getModal(modalType);
    return <Modal />;
  };

  const setActiveChannel = (id) => () => {
    dispatch(changeChannel({ id }));
  };

  const addingHandler = () => {
    dispatch(openModal('addingModal'));
  };

  const deletingHandler = () => {
    dispatch(openModal('deletingModal'));
  };

  const renamingHandler = () => {
    dispatch(openModal('renamingModal'));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={addingHandler}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button type="button" className="btn btn-link p-0 ml-4" onClick={deletingHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button type="button" className="btn btn-link p-0 ml-4" onClick={renamingHandler}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      { status === 'opened' && renderModal(type)}
      <ul className="nav flex-column nav-pills nav-fill">
        {sortedChannels.map(({ id, name }) => (
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
              onClick={setActiveChannel(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
