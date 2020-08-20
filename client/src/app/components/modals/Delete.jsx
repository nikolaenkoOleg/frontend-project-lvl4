import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import i18next from 'i18next';

import getUrl from '../../../routes';
import { closeModal } from '../../actions';

export default () => {
  const store = useSelector((state) => {
    const { channelsState: { currentChannelId, channels } } = state;
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);

    return {
      id: currentChannelId,
      name: currentChannel.name,
      removable: currentChannel.removable,
    };
  });
  const { id, name, removable } = store;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: async (_values, { setSubmitting, setFieldError }) => {
      const url = getUrl.channelPath(id);
      if (removable) {
        try {
          await axios.delete(url, { data: { attributes: { id } } });
          setSubmitting(false);
          dispatch(closeModal('deleteModal'));
        } catch (error) {
          setSubmitting(false);
          setFieldError('network', i18next.t('errors.network'));
        }
      }
    },
  });

  const onClose = () => {
    dispatch(closeModal('deleteModal'));
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
            Delete this channel
            &quot;
            {name}
            &quot;?
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
