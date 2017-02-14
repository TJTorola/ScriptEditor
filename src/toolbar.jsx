import React from 'react';

const findEditorId = (domNode) => {
  if (!domNode) return;
  if (domNode.dataset.id) return domNode.dataset.id;

  return findEditorId(domNode.parentElement);
}

const addToken = (editors, token) => () => {
  const id = findEditorId(document.activeElement);
  if (!id) return;

  editors.forEach(editor => {
    if (editor.id === id) {
      editor.addToken(token)();
    }
  });
};

const tokenButton = editors => (token, idx) => (
  <span
    className="token-button"
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
