import React, { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';

import { closeModal } from '../../actions';
import getUrl from '../../../routes';

const validationSchema = Yup.object({
  channelName: Yup
    .string()
    .required(i18next.t('errors.required')),
});

export default () => {
  const { channels } = useSelector((state) => state.channelsState);
  const { currentChannelId } = useSelector((state) => state.channelsState);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channelName: currentChannel.name,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
      const url = getUrl.channelPath(currentChannelId);
      try {
        await axios.patch(url, { data: { attributes: { name: values.channelName } } });
        setSubmitting(false);
        resetForm({
          channelName: '',
        });
        dispatch(closeModal('renamingModal'));
      } catch (error) {
        setSubmitting(false);
        setFieldError('network', i18next.t('errors.network'));
      }
    },
  });
  const inputRef = useRef(null);
  const setFocus = () => inputRef.current.focus();
  useEffect(setFocus);

  const onClose = () => {
    if (formik.isSubmitting) {
      return;
    }
    dispatch(closeModal('renamingModal'));
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
                  disabled={formik.isSubmitting}
                  ref={inputRef}
                />
              </Form.Group>
            </Form>
            { formik.errors.channelName && <div className="d-block invalid-feedback">{formik.errors.channelName}</div> }
            { formik.errors.network && <div className="alert alert-warning">{formik.errors.network}</div> }
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
              {formik.isSubmitting ? 'Loading...' : 'Rename'}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
