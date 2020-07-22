import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { closeModal as closeModalAction, editChannelAction } from '../../actions';

const mapStateToProps = (state) => {
  const { channelsState: { channels, currentChannelId } } = state;
  const currnetChannel = channels.find((channel) => channel.id === currentChannelId);

  return { name: currnetChannel.name, currentChannelId };
};

const mapDispatchToProps = {
  closeModal: closeModalAction,
  editChannel: editChannelAction,
};

class Add extends React.PureComponent {
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
    const { editChannel, closeModal, currentChannelId } = this.props;
    const { channelName } = this.state;
    editChannel({ channelName, currentChannelId });
    closeModal('edit');
  }

  onClose = () => {
    const { closeModal } = this.props;
    closeModal('edit');
  }

  render() {
    const { channelName } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header closeButton onClick={this.onClose}>
          <Modal.Title>Rename Channel</Modal.Title>
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
          <Button variant="primary" onClick={this.onSubmit}>Rename</Button>
          {/* <Button type="submit">Submit form</Button> */}
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
