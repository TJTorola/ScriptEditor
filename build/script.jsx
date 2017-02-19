import React from 'react';
import ReactDOM from 'react-dom';

import Editor from '../src/editor.jsx';
import Toolbar from '../src/toolbar.jsx';

const callback = (_, addToken, addText) => {
  setTimeout(() => {
    addToken('foo', {
      key: 'foo',
      length: 3,
    });
  }, 1000);

  setTimeout(() => {
    addToken('bar', {
      key: 'bar',
      length: 3,
    });
  }, 2000);

  setTimeout(() => {
    addToken('baz', {
      key: 'baz',
      length: 3,
    });
  }, 3000);
}

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
      type: 'ADD_TEXT',
      text: '💩'
    },
    {
      type: 'CUSTOM',
      text: 'Custom Callback',
      callback,
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
