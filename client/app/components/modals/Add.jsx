import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';

import { closeModal } from '../../actions';
import getUrl from '../../../routes';

export default () => {
  const { channels } = useSelector((state) => state.channelsState);
  const channelsNames = channels.map((channel) => channel.name);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    channelName: Yup
      .string()
      .required(i18next.t('errors.required'))
      .notOneOf(channelsNames),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
      const { channelName } = values;
      const url = getUrl.channelsPath();
      try {
        await axios.post(url, { data: { attributes: { name: channelName } } });
        resetForm({
          channelName: '',
        });
        setSubmitting(false);
        dispatch(closeModal('addingModal'));
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
    dispatch(closeModal('addingModal'));
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
              {formik.isSubmitting ? 'Loading...' : 'Add'}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
