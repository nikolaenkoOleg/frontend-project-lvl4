import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { closeModal as closeModalAction, editChannelAction } from '../../actions';

const mapStateToProps = (state) => {
  const { modalState: { isShow }, channelsState: { channels, currentChannelId } } = state;
  const currnetChannel = channels.find((channel) => channel.id === currentChannelId);

  return { isShow, name: currnetChannel.name };
};

const mapDispatchToProps = {
  closeModal: closeModalAction,
  editChannel: editChannelAction,
};

class Delete extends React.PureComponent {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      channelName: name,
    };
  }

  onChange = ({ target }) => {
    this.setState({ channelName: target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { editChannel, closeModal } = this.props;
    const { channelName } = this.state;
    editChannel(channelName);
    closeModal();
  }

  onClose = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const { channelName } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control required type="text" value={channelName} placeholder="Enter new channel name" onChange={this.onChange} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onClose}>Close</Button>
          <Button variant="primary" onClick={this.onSubmit}>Add</Button>
          {/* <Button type="submit">Submit form</Button> */}
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
