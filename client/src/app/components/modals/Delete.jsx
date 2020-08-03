import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { closeModal as closeModalAction, deleteChannelAction } from '../../actions';

const mapStateToProps = (state) => {
  const { channelsState: { currentChannelId, channels } } = state;
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);

  return {
    id: currentChannelId,
    name: currentChannel.name,
    removable: currentChannel.removable,
  };
};

const mapDispatchToProps = {
  closeModal: closeModalAction,
  deleteChannel: deleteChannelAction,
};

class Delete extends React.PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
    const {
      deleteChannel,
      closeModal,
      id,
      removable,
    } = this.props;
    if (removable) {
      deleteChannel(id);
      closeModal();
    }
  }

  onClose = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const { name } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Delete this channel
          &quot;
          {name}
          &quot;?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onClose}>Close</Button>
          <Button variant="primary" onClick={this.onSubmit}>Delete</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
