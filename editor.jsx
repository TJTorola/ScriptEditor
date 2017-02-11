import React from 'react';
import Quill from 'quill';

class ScriptEditor extends React.Component {
  constructor(props) {
    super(props);

    this.addToken = this.addToken.bind(this);
    this.selectionChange = this.selectionChange.bind(this);
  }

  componentDidMount() {
    this.quill = new Quill(this.input);
    this.quill.on('text-change', this.textChange);
    this.quill.on('selection-change', this.selectionChange);
  }

  // http://quilljs.com/docs/api/#text-change
  textChange(delta, oldDelta, source) {
    // debugger;
  }

  // http://quilljs.com/docs/api/#selection-change
  selectionChange(range, oldRange, source) {
    // debugger;
  }

  addToken() {
    const { quill } = this;
    const { index, length } = this.quill.getSelection(true);

    quill.deleteText(index, length);
    quill.insertText(index, 'token', { bold: true });
    quill.setSelection(index + 5);
  }

  render() {
    return (
      <div>
        <div
          ref={(input) => this.input = input}
          className="editor"
        />
        <div
          ref={(button) => this.button = button}
          onClick={this.addToken}
        >
          Add Token
        </div>
      </div>
    );
  }
};

export default ScriptEditor;
