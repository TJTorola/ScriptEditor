import React from 'react';
import {
  CompositeDecorator,
  EditorState,
} from 'draft-js';

const TOKEN_KEY = 'TOKEN';

const TokenSpan = (props) => (
  <span className="token">{props.children}</span>
);

const tokenStategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (char) => {
      const entityKey = char.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === TOKEN_KEY
      );
    },
    callback,
  );
};

export const decorator = new CompositeDecorator([
  {
    strategy: tokenStategy,
    component: TokenSpan,
  }
]);

export const applyTokenEntity = (token) => ({ editorState }) => {
  const contentState = editorState.getCurrentContent();
  const contentWithEntity = contentState.createEntity(
    TOKEN_KEY,
    'IMMUTABLE',
    { token }
  );
  const newEditorState = EditorState.set(
    editorState,
    { currentContent: contentWithEntity }
  );
  const entityKey = contentWithEntity.getLastCreatedEntityKey();

  return {
    editorState: newEditorState,
    entityKey,
  };
};
