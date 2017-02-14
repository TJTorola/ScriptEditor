import React from 'react';
import { CompositeDecorator } from 'draft-js';

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

const decorator = new CompositeDecorator([
  {
    strategy: tokenStategy,
    component: TokenSpan,
  }
]);

const applyTokenEntity = (editorState, token) => {
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
  const entityKey = contentWithEntity.getLastCreatedEntityKey();

  return {
    newEditorState,
    entityKey,
  };
}

export default {
  decorator,
  applyTokenEntity
};
