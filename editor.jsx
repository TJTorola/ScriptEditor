import React from 'react';
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
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

  addToken(token) {
    return () => {
      const entityKey = this.createTokenEntity(token);
      this.replaceTextWithTokenEntity(token, entityKey);
    };
  }

  createTokenEntity(token) {
    const { editorState } = this.state,
          contentState = editorState.getCurrentContent(),
          contentWithEntity = contentState.createEntity(
            'TOKEN',
            'IMMUTABLE',
            { token }
          ),
          newEditorState = EditorState.createWithContent(contentWithEntity);

    this.setEditorState(newEditorState);
    return contentWithEntity.getLastCreatedEntityKey();
  }

  replaceTextWithTokenEntity(token, entityKey) {
    const { editorState } = this.state,
          contentState = editorState.getCurrentContent(),
          selectionState = editorState.getSelection(),
          contentWithToken = Modifier.replaceText(
            contentState,
            selectionState,
            token,
            [],
            entityKey,
          ),
          newEditorState = EditorState.createWithContent(contentWithToken);

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
          onClick={ this.addToken('token') }
        >
          Add Token
        </div>
      </div>
    );
  }
}

export default TokenEditor;
