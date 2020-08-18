import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';

import { closeModal, addNewChannelAction as addChannel } from '../../actions';

export default () => {
  const store = useSelector((state) => {
    const { channelsState: { channels } } = state;
    const channelsNames = channels.map((channel) => channel.name);

    return { channelsNames };
  });
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    channelName: Yup
      .string()
      .required(i18next.t('errors.required'))
      .notOneOf(store.channelsNames),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const { channelName } = values;
      await dispatch(addChannel(channelName));
      setSubmitting(false);
      resetForm({
        channelName: '',
      });
      dispatch(closeModal('addModal'));
    },
  });

  const onClose = () => {
    if (formik.isSubmitting) {
      return;
    }
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
                  disabled={formik.isSubmitting}
                />
              </Form.Group>
            </Form>
            { formik.errors.channelName && <div className="d-block invalid-feedback">{formik.errors.channelName}</div> }
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Loading...' : 'Add'}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
