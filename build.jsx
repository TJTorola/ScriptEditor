import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './editor.jsx';
import Toolbar from './toolbar.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const tokens = [
    'foo',
    'bar',
    'baz',
  ];
  const editors = [];

  ReactDOM.render(<Editor ref={e => editors.push(e)} />, document.getElementById('editor-one'));
  ReactDOM.render(<Editor ref={e => editors.push(e)} />, document.getElementById('editor-two'));
  ReactDOM.render(<Toolbar tokens={tokens} editors={editors}/>, document.getElementById('toolbar'));
});
