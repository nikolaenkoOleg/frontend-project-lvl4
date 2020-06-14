import React from 'react';

export default class InputField extends React.PureComponent {
  render() {
    return (
      <div className="mt-auto">
        <form noValidate className>
          <div className="form-group">
            <div className="input-group">
              <input type="text" name="body" className="form-control" />
              <div className="d-block invalid-feedback" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
