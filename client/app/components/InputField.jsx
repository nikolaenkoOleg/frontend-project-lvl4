import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as Yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';

import UserContext from '../context';
import getUrl from '../../routes';

export default () => {
  const validationSchema = Yup.object({
    message: Yup.string().required(i18next.t('errors.required')),
  });
  const user = useContext(UserContext);
  const currentChannelId = useSelector((state) => state.channelsState.currentChannelId);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: async (value, { resetForm, setSubmitting, setFieldError }) => {
      const channelId = currentChannelId;
      const message = { channelId, author: user, text: value.message };
      const url = getUrl.channelMessagesPath(channelId);

      try {
        await axios.post(url, { data: { attributes: { message } } });
        resetForm({
          message: '',
        });
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        setFieldError('network', i18next.t('errors.network'));
      }
    },
  });

  const inputRef = useRef(null);
  const setFocus = () => inputRef.current.focus();
  useEffect(setFocus);

  return (
    <div className="mt-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              type="text"
              id="message"
              name="message"
              disabled={formik.isSubmitting}
              className={cn({
                'form-control': true,
                'is-invalid': !!formik.errors.message,
              })}
              onChange={formik.handleChange}
              value={formik.values.message}
              ref={inputRef}
            />
            { formik.isSubmitting && <div className="spinner-border ml-2 mt-1" role="status" /> }
            { formik.errors.message && <div className="d-block invalid-feedback">{formik.errors.message}</div> }
          </div>
          { formik.errors.network && <div className="alert alert-warning">{formik.errors.network}</div> }
        </div>
      </form>
    </div>
  );
};
