import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { closeModal, renameChannelAction as renameChannel } from '../../actions';

const validationSchema = Yup.object({
  channelName: Yup.string().required(),
});

export default () => {
  const store = useSelector((state) => {
    const { channelsState: { channels, currentChannelId } } = state;
    const currnetChannel = channels.find((channel) => channel.id === currentChannelId);

    return { name: currnetChannel.name, currentChannelId };
  });
  const { name, currentChannelId } = store;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(renameChannel({ channelName: values.channelName, currentChannelId }));
      resetForm({
        channelName: '',
      });
      dispatch(closeModal('renameModal'));
    },
  });

  const onClose = () => {
    dispatch(closeModal('renameModal'));
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
