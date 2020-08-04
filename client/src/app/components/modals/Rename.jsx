import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import { closeModal as closeModalAction, renameChannelAction } from '../../actions';

const mapStateToProps = (state) => {
  const { channelsState: { channels, currentChannelId } } = state;
  const currnetChannel = channels.find((channel) => channel.id === currentChannelId);

  return { name: currnetChannel.name, currentChannelId };
};

const mapDispatchToProps = {
  closeModal: closeModalAction,
  renameChannel: renameChannelAction,
};

const validateField = (values) => {
  const { channelName } = values;
  const error = {};

  if (!channelName) {
    error.channelName = 'This field should not be empty';
  }

  return error;
};

const Rename = (props) => {
  const { name } = props;
  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    validate: validateField,
    onSubmit: (values, { resetForm }) => {
      const { renameChannel, closeModal, currentChannelId } = props;
      renameChannel({ channelName: values.channelName, currentChannelId });
      resetForm({
        channelName: '',
      });
      closeModal('renameModal');
    },
  });

  const onClose = () => {
    const { closeModal } = props;
    closeModal('renameModal');
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div className="fade modal show" style={{ display: 'block', paddingRight: '15px' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Rename Channel</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  required
                  type="text"
                  name="channelName"
                  value={formik.values.channelName}
                  placeholder="Enter new channel name"
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {formik.errors.channelName ? <div className="d-block invalid-feedback">{formik.errors.channelName}</div> : null}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={formik.handleSubmit}>Rename</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);
