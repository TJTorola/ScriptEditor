import React from 'react';
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  CompositeDecorator,
} from 'draft-js';

const TokenSpan = (props) => (
  <span className="token">{props.children}</span>
);

const tokenStategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (char) => {
      const entityKey = char.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'TOKEN'
      );
    },
    callback,
  );
};

class TokenEditor extends React.Component {
  constructor(props) {
    super(props);

    this.decorator = new CompositeDecorator([
      {
        strategy: tokenStategy,
        component: TokenSpan,
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(this.decorator)
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
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentWithEntity = contentState.createEntity(
      'TOKEN',
      'IMMUTABLE',
      { token }
    );
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentWithEntity }
    );

    this.setEditorState(newEditorState);
    return contentWithEntity.getLastCreatedEntityKey();
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

    this.setEditorState(newEditorState);
  }



  render() {
    return (
      <div className="editor">
        <Editor
          editorState={this.state.editorState}
          onChange={this.setEditorState}
        />
      </div>
    );
  }
}

export default TokenEditor;
