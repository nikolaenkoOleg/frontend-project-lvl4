import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';

import { sendMessageAction } from '../actions';
import UserContext from '../context';

const mapStateToProps = (state) => {
  const { channelsState: { currentChannelId } } = state;

  return { currentChannelId };
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
              className={cn({
                'form-control': true,
                'is-invalid': formik.errors.message !== undefined,
              })}
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            {formik.errors.message ? <div className="d-block invalid-feedback">{formik.errors.message}</div> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
