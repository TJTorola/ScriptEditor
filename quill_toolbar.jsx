import React from 'react';

const addToken = (editors, token) => () => {
  const focus = document.activeElement;
  if (!focus.classList.contains("ql-editor")) return;

  const id = focus.parentElement.dataset.id;
  editors.forEach(editor => {
    if (editor.id === id) {
      editor.addToken(token);
    }
  });
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
