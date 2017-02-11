import React from 'react';

const tokenButton = (token, idx) => (
  <span className="button" key={ idx }>
    +{ token }
  </span>
);

const Toolbar = ({ tokens }) => (
  <div className="toolbar">
    { tokens.map(tokenButton) }
  </div>
);

export default Toolbar;
