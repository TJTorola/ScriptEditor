import React from 'react';

const addToken = (editors, token) => () => {
  editors[0].addToken(token);
};

const tokenButton = editors => (token, idx) => (
  <span
    className="button"
    key={idx}
    onMouseDown={e => e.preventDefault()}
    onClick={addToken(editors, token)}
  >
    +{ token }
  </span>
);

const Toolbar = ({ tokens, editors }) => (
  <div className="toolbar">
    { tokens.map(tokenButton(editors)) }
  </div>
);

export default Toolbar;
