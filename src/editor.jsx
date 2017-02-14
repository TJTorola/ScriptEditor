import React from 'react';
import {
  Editor,
  EditorState,
  Modifier,
} from 'draft-js';

import {
  decorator,
  applyTokenEntity
} from './token.jsx';

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
      const {
        newEditorState,
        entityKey,
      } = applyTokenEntity(editorState, token);
      this.setEditorState(newEditorState);

      this.replaceTextWithTokenEntity(token, entityKey);
    };
  }

  replaceTextWithTokenEntity(token, entityKey) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentWithToken = Modifier.replaceText(
      contentState,
      selectionState,
      token,
      [],
      entityKey,
    );
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentWithToken }
    );

    const collapsedSelectionState = newEditorState.getSelection();
    const offset = collapsedSelectionState.getFocusOffset() + token.length;
    const newSelection = selectionState
      .set('anchorOffset', offset)
      .set('focusOffset', offset);

    const newSelectedEditorState = EditorState.set(
      newEditorState,
      { selection: newSelection }
    );

    this.setEditorState(newSelectedEditorState);
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
