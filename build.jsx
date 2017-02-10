import React from 'react';
import ReactDom from 'react-dom';

import Editor from './editor.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(document.getElementById('root'), <Editor />);
});
