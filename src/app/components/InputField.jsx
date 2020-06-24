import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import coockies from 'js-cookie';

import { sendMessageAction, fetchMessages } from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;

  return { currentChannelId };
};

const mapDispatchToProps = {
  sendMessageAction,
  fetchMessages,
};

const InputField = (props) => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const sendMessage = props.sendMessageAction;
      const channelId = props.currentChannelId;
      const author = coockies.get('user');
      const message = { channelId, author, text: values.message };
      sendMessage(message);
      fetchMessages(channelId);
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


// { channelId: id, text: text, author: Oleg123 }
