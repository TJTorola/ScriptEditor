import React from 'react';
import { Editor, EditorState } from 'draft-js';

import { decorator, applyTokenEntity } from './token.jsx';
import { replaceWithText, moveFocus, pipe } from './draft-helpers.js';

class TokenEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(decorator)
    };
    this.id = Math.random().toString();
    this.setEditorState = (editorState) => this.setState({ editorState });
    this.addToken = this.addToken.bind(this);
    this.focus = this.focus.bind(this);
  }

  addToken(text, token) {
    const { editorState } = this.state;
    const newEditorState = pipe(
      editorState,
      applyTokenEntity(token),
      replaceWithText(text),
      moveFocus(text.length),
      replaceWithText(' '),
      moveFocus(1),
    );

    this.setEditorState(newEditorState);
  }

  focus() {
    this.editor && this.editor.focus()
  }

  render() {
    return (
      <div
        className="editor"
        data-id={this.id}
        onClick={ this.focus }
      >
        <Editor
          editorState={this.state.editorState}
          onChange={this.setEditorState}
          ref={(editor) => this.editor = editor}
        />
      </div>
    );
  }
}

export default TokenEditor;
