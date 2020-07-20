import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';

import { sendMessageAction } from '../actions';
import UserContext from '../context';
import Loader from './Loader';

const mapStateToProps = (state) => {
  const { channelsState: { currentChannelId }, messagesState: { sendMessageState } } = state;

  return { currentChannelId, sendMessageState };
};

const mapDispatchToProps = {
  sendMessage: sendMessageAction,
};

const validate = (values) => {
  const errors = {};

  if (!values.message) {
    errors.message = 'Required';
  }

  return errors;
};

const InputField = (props) => {
  const { sendMessageState } = props;
  const user = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const { sendMessage } = props;
      const channelId = props.currentChannelId;
      const message = { channelId, author: user, text: values.message };

      sendMessage(message);
      resetForm({
        message: '',
      });
    },
  });

  return (
    <div className="mt-auto">
      <form noValidate onSubmit={formik.handleSubmit}>
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
            <Loader show={sendMessageState.type === 'request'} />
            {formik.errors.message ? <div className="d-block invalid-feedback">{formik.errors.message}</div> : null}
            {sendMessageState.type === 'error' ? <div className="d-block invalid-feedback">{sendMessageState.text}</div> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
