import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as Yup from 'yup';
import i18next from 'i18next';

import { sendMessageAction as sendMessage } from '../actions';
import UserContext from '../context';

export default () => {
  const validationSchema = Yup.object({
    message: Yup.string().required(i18next.t('errors.required')),
  });
  const user = useContext(UserContext);
  const store = useSelector((state) => {
    const {
      messagesState: { sendMessageState },
      channelsState: { currentChannelId },
    } = state;

    return { sendMessageState, currentChannelId };
  });
  const { sendMessageState, currentChannelId } = store;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: async (value, { resetForm, setSubmitting }) => {
      const channelId = currentChannelId;
      const message = { channelId, author: user, text: value.message };

      await dispatch(sendMessage(message));
      setSubmitting(false);
      resetForm({
        message: '',
      });
    },
  });

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
            />
            { formik.isSubmitting && <div className="spinner-border ml-2 mt-1" role="status" /> }
            { formik.errors.message && <div className="d-block invalid-feedback">{formik.errors.message}</div> }
          </div>
          { sendMessageState.type === 'error' && <div className="alert alert-warning">Network error</div> }
        </div>
      </form>
    </div>
  );
};
