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
  const addingModalIsShown = useSelector((state) => state.modalsState.addingModalIsShown);
  const renamingModalIsShown = useSelector((state) => state.modalsState.renamingModalIsShown);
  const deletingModalIsShown = useSelector((state) => state.modalsState.deletingModalIsShown);
  const channels = useSelector((state) => state.channelsState.channels);
  const currentChannelId = useSelector((state) => state.channelsState.currentChannelId);

  const sortedChannels = channels.slice().sort((a, b) => a.id - b.id);

  const dispatch = useDispatch();

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

  const addingModal = addingModalIsShown ? (<Add />) : null;
  const renamingModal = renamingModalIsShown ? (<Rename />) : null;
  const deletingModal = deletingModalIsShown ? (<Delete />) : null;

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
        {addingModal}
        {renamingModal}
        {deletingModal}
      </div>
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
