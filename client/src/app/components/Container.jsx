import React from 'react';

export default (props) => {
  const { children } = props;
  return (
    <div className="h-100" id="chat">
      <div className="row h-100 pb-3">{children}</div>
    </div>
  );
};
