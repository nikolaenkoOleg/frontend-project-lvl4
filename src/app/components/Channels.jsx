import React from 'react';

export default class Channels extends React.PureComponent {
  render() {
    const { channels } = this.props;
    console.log(channels);

    return (
      <div className="h-100" id="chat">
        <div className="row h-100 pb-3">
          <div className="col-3 border-right">
            <div className="d-flex mb-2">
              <span>Channels</span>
              <button type="button" className="btn btn-link p-0 ml-auto">+</button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill">
              {channels.map(({ id, name }) => (
                <React.Fragment key={id}>
                  <li className="nav-item">
                    <button type="button" className="nav-link btn btn-block">{name}</button>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
