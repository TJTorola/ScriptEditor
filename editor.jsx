import React from 'react';
import {
  Editor,
  EditorState,
  Modifier,
} from 'draft-js';

class TokenEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.setEditorState = (editorState) => this.setState({ editorState });
    this.addToken = this.addToken.bind(this);
  }

  addToken() {
    const { editorState } = this.state,
          contentState = editorState.getCurrentContent(),
          selectionState = editorState.getSelection();

    const newContentState = Modifier.replaceText(
      contentState,
      selectionState,
      'token'
    );

    const newEditorState = EditorState.createWithContent(newContentState);
    this.setEditorState(newEditorState);
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.setEditorState}
        />
        <div
          onMouseDown={ (e) => e.preventDefault() }
          onClick={ this.addToken }
        >
          Add Token
        </div>
      </div>
    );
  }
}

export default TokenEditor;
