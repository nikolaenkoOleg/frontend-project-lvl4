import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';
import { useFormik } from 'formik';
import cn from 'classnames';

import { sendMessageAction as sendMessage } from '../actions';
import UserContext from '../context';

const validate = (values) => {
  const errors = {};

  if (!values.message) {
    errors.message = 'Required';
  }

  return errors;
};

export default () => {
  const user = useContext(UserContext);
  const store = useSelector((state) => {
    const {
      messagesState: { messages, sendMessageState },
      channelsState: { currentChannelId },
    } = state;

    const currentChannelMessages = messages
      .filter(({ channelId }) => currentChannelId === channelId);

    return { messages: currentChannelMessages, sendMessageState, currentChannelId };
  });
  const { messages, sendMessageState, currentChannelId } = store;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const channelId = currentChannelId;
      const message = { channelId, author: user, text: values.message };

      dispatch(sendMessage(message));
      resetForm({
        message: '',
      });
    },
  });

  const loader = sendMessageState.type === 'request' ? (
    <div className="spinner-border ml-2 mt-1" role="status" />
  ) : null;

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <>
          <div id="messages-box" className="chat-messages overflow-auto mb-3">
            {
              messages.map(({ message: { author, text } }) => (
                <React.Fragment key={uniqueId()}>
                  <div>
                    <React.Fragment key={uniqueId()}>
                      <b>{author}</b>
                      {': '}
                      {text}
                    </React.Fragment>
                  </div>
                </React.Fragment>
              ))
            }
          </div>
          <div className="mt-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    id="message"
                    name="message"
                    disabled={sendMessageState.type === 'request'}
                    className={cn({
                      'form-control': true,
                      'is-invalid': formik.errors.message !== undefined || sendMessageState.type === 'error',
                    })}
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  />
                  {loader}
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
        </>
      </div>
    </div>
  );
};
