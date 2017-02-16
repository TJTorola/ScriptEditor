import React from 'react';
import ReactDOM from 'react-dom';

import Editor from '../src/editor.jsx';
import Toolbar from '../src/toolbar.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const actions = [
    {
      type: 'ADD_TOKEN',
      text: 'Agent Token',
      token: {
        key: 'agent-name',
        length: 10,
      }
    },
    {
      type: 'ADD_TEXT',
      text: 'Plaintext Input',
    },
    {
      type: 'CUSTOM',
      text: 'Custom Callback',
      callback: (event, addToken, addText) => {}
    }
  ];
  const editors = [];

  ReactDOM.render(
    <Editor ref={ e => editors.push(e) }/>,
    document.getElementById('editor-one')
  );

  ReactDOM.render(
    <Editor ref={ e => editors.push(e) }/>,
    document.getElementById('editor-two')
  );

  ReactDOM.render(
    <Toolbar actions={actions} editors={editors}/>,
    document.getElementById('toolbar')
  );
});
