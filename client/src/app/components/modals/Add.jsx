import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { closeModal as closeModalAction, addNewChannelAction } from '../../actions';

// const mapStateToProps = (state) => {
//   const { modalState: { isShow } } = state;

//   return { isShow };
// };

const mapDispatchToProps = {
  closeModal: closeModalAction,
  addChannel: addNewChannelAction,
};

class Add extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
    };
  }

  onChange = ({ target }) => {
    this.setState({ channelName: target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { addChannel, closeModal } = this.props;
    const { channelName } = this.state;
    addChannel(channelName);
    closeModal('add');
  }

  onClose = () => {
    const { closeModal } = this.props;
    closeModal('add');
  }

  render() {
    const { channelName } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header closeButton onClick={this.onClose}>
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
          {/* <Button type="submit">Submit form</Button>
            сделать поля обязательными
            сделать невозможность добавлять канал с сущесвующим именем
          */}
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default connect(null, mapDispatchToProps)(Add);
