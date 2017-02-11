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

  debugger;
  ReactDOM.render(<Editor />, document.getElementById('editor'));
  ReactDOM.render(<Toolbar tokens={tokens} />, document.getElementById('toolbar'));
});
