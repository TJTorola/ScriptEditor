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
  }

  addToken(token) {
    return () => {
      const { editorState } = this.state;
      const newEditorState = pipe(
        editorState,
        applyTokenEntity(token),
        replaceWithText(token),
        moveFocus(token.length),
      );

      this.setEditorState(newEditorState);
    };
  }

  render() {
    return (
      <div
        className="editor"
        data-id={this.id}
      >
        <Editor
          editorState={this.state.editorState}
          onChange={this.setEditorState}
        />
      </div>
    );
  }
}

export default TokenEditor;
