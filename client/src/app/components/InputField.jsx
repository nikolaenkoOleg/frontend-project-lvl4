import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';

import { sendMessageAction } from '../actions';
import UserContext from '../context';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;

  return { currentChannelId };
};

const mapDispatchToProps = {
  sendMessage: sendMessageAction,
};

const InputField = (props) => {
  const user = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      console.log(user);
      const { sendMessage } = props;
      const channelId = props.currentChannelId;
      const message = { channelId, author: user, text: values.message };
      sendMessage(message);
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
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            <div className="d-block invalid-feedback" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
