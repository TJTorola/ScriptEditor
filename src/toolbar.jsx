import React from 'react';

const ADD_TOKEN = 'ADD_TOKEN';
const ADD_TEXT = 'ADD_TEXT';
const CUSTOM = 'CUSTOM';

const findEditorId = (domNode) => {
  if (!domNode) return;
  if (domNode.dataset.id) return domNode.dataset.id;

  return findEditorId(domNode.parentElement);
};

const addToken = (editor) => (text, token) => editor.addToken(text, token);
const addText = (editor) => (text) => editor.addText(text)

const handleClick = (editors, action) => (e) => {
  const id = findEditorId(document.activeElement);
  const editor = editors.find(editor => editor.id === id);
  if (!editor) return;

  switch (action.type) {
    case ADD_TOKEN:
      return addToken(editor)(action.text, action.token);
    case ADD_TEXT:
      return addText(editor)(action.text)
    case CUSTOM:
      return action.callback(e, addToken(editor), addText(editor))
  };
};

const actionButton = editors => (action, idx) => (
  <span
    className="action-button"
    key={idx}
    onMouseDown={e => e.preventDefault()}
    onClick={handleClick(editors, action)}
  >
    +{ action.text }
  </span>
);

const Toolbar = ({ actions, editors }) => (
  <div className="toolbar">
    { actions.map(actionButton(editors)) }
  </div>
);

export default Toolbar;
