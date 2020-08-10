import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal, deleteChannelAction as deleteChannel } from '../../actions';

export default () => {
  const store = useSelector((state) => {
    const { channelsState: { currentChannelId, channels } } = state;
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);

    return {
      id: currentChannelId,
      name: currentChannel.name,
      removable: currentChannel.removable,
    };
  });
  const { id, name, removable } = store;
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (removable) {
      dispatch(deleteChannel(id));
      dispatch(closeModal('deleteModal'));
    }
  };

  const onClose = () => {
    dispatch(closeModal('deleteModal'));
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div className="fade modal show" style={{ display: 'block', paddingRight: '15px' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Delete channel</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Delete this channel
            &quot;
            {name}
            &quot;?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={onSubmit}>Delete</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
