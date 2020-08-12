import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as Yup from 'yup';

import { sendMessageAction as sendMessage } from '../actions';
import UserContext from '../context';

export default () => {
  const validationSchema = Yup.object({
    message: Yup.string().required(),
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
          <div className="input-group">
            <input
              type="text"
              id="message"
              name="message"
              disabled={formik.isSubmitting}
              className={cn({
                'form-control': true,
                'is-invalid': formik.errors.message || sendMessageState.type === 'error',
              })}
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            { formik.isSubmitting ? <div className="spinner-border ml-2 mt-1" role="status" /> : null }
            {
              formik.errors.message
                ? <div className="d-block invalid-feedback">{formik.errors.message}</div>
                : null
            }
            {
              sendMessageState.type === 'error'
                ? <div className="d-block invalid-feedback">{sendMessageState.text}</div>
                : null
            }
          </div>
        </div>
      </form>
    </div>
  );
};
