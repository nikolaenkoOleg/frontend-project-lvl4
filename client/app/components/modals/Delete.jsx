import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import i18next from 'i18next';

import getUrl from '../../../routes';
import { closeModal } from '../../actions';

export default () => {
  const channels = useSelector((state) => state.channelsState.channels);
  const currentChannelId = useSelector((state) => state.channelsState.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const { id, name, removable } = currentChannel;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_values, { setSubmitting, setFieldError }) => {
      const url = getUrl.channelPath(id);
      if (removable) {
        try {
          await axios.delete(url, { data: { attributes: { id } } });
          setSubmitting(false);
          dispatch(closeModal('deletingModal'));
        } catch (error) {
          setSubmitting(false);
          setFieldError('network', i18next.t('errors.network'));
        }
      } else {
        setFieldError('noremovable', i18next.t('errors.noremovable'));
      }
    },
  });

  const onClose = () => {
    if (formik.isSubmitting) {
      return;
    }
    dispatch(closeModal('deletingModal'));
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div className="fade modal show" style={{ display: 'block', paddingRight: '15px' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Delete channel</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Delete channel
            &quot;
            {name}
            &quot;?
            { formik.errors.noremovable && <div className="d-block invalid-feedback">{formik.errors.noremovable}</div> }
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
              {formik.isSubmitting ? 'Deleting...' : 'Delete'}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
