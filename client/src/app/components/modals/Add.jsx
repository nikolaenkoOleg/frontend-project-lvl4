import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { closeModal, addNewChannelAction as addChannel } from '../../actions';

const validateFields = (store) => (values) => {
  const { channelsNames } = store;
  const { channelName } = values;
  const error = {};

  if (!channelName) {
    error.channelName = 'Required';
  }

  if (channelsNames.includes(channelName)) {
    error.channelName = 'Channel name should not be duplicated';
  }

  return error;
};

export default () => {
  const store = useSelector((state) => {
    const { channelsState: { channels } } = state;
    const channelsNames = channels.map((channel) => channel.name);

    return { channelsNames };
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validate: validateFields(store),
    onSubmit: (values, { resetForm }) => {
      const { channelName } = values;
      dispatch(addChannel(channelName));
      resetForm({
        channelName: '',
      });
      dispatch(closeModal('addModal'));
    },
  });

  const onClose = () => {
    dispatch(closeModal('addModal'));
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div className="fade modal show" style={{ display: 'block', paddingRight: '15px' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Add Channel</Modal.Title>
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
            <Button variant="primary" onClick={formik.handleSubmit}>Add</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
