import React from 'react';
import Quill from 'quill';

const QUILL_OPTIONS = {
  formats: ['bold'],
}

// https://quilljs.com/guides/cloning-medium-with-parchment/
const Inline = Quill.import('blots/inline');
class Token extends Inline {
  static tagName = 'STRONG';
  static blotName = 'token';

  static create(key) {
    let node = super.create();
    node.dataset.key = key;

    return node;
  }

  static formats(node) {
    return node.dataset.key;
  }
}

Quill.register('blots/token', Token);
// debugger;

class ScriptEditor extends React.Component {
  constructor(props) {
    super(props);
    this.id = Math.random().toString();
  }

  componentDidMount() {
    this.quill = new Quill(this.input, QUILL_OPTIONS);
    this.quill.on('text-change', this.textChange.bind(this));
    this.quill.on('selection-change', this.selectionChange.bind(this));
  }

  // http://quilljs.com/docs/api/#text-change
  textChange(delta, oldDelta, source) {
  }

  // http://quilljs.com/docs/api/#selection-change
  selectionChange(range, oldRange, source) {
    // debugger;
    // this.quill.format('bold', false);
  }

  addToken(token) {
    const { quill } = this;
    const { index, length } = this.quill.getSelection(true);

    quill.deleteText(index, length);
    quill.insertText(index, token, { 'token': 'hi' });
    quill.setSelection(index + token.length, 0);
    quill.format('inline', true);
  }

  render() {
    return (
      <div
        data-id={this.id}
        ref={(input) => this.input = input}
        className="editor"
      />
    );
  }
};

export default ScriptEditor;
