import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { actions } from '../redusers';

const mapDispatchToProps = {
  changeChannel: actions.changeChannel,
};

const InputField = (props) => {
  console.log(props);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const { sendMessage } = props;
      console.log(sendMessage);
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

export default connect(null, mapDispatchToProps)(InputField);
