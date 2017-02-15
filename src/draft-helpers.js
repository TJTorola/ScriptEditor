import {
  Modifier,
  EditorState
} from 'draft-js';

export const pipe = (...args) => {
  const [editorState, ...funcs] = args;

  return funcs
    .reduce((state, func) => func(state), { editorState })
    .editorState;
}

// () => ... => ({ editorState, ... }) => { editorState, ... }

export const replaceWithText = (text) => ({ editorState, entityKey }) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const contentWithText = Modifier.replaceText(
    contentState,
    selectionState,
    text,
    [],
    entityKey,
  );
  const newEditorState = EditorState.set(
    editorState,
    { currentContent: contentWithText }
  );

  return {
    editorState: newEditorState
  };
};

export const applyImmutableEntity = (entityName) => (token) => ({ editorState }) => {
  const contentState = editorState.getCurrentContent();
  const contentWithEntity = contentState.createEntity(
    entityName,
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

export const moveFocus = (offset) => ({ editorState }) => {
  const selectionState = editorState.getSelection();
  const newFocus = selectionState.getFocusOffset() + offset;
  const newSelection = selectionState
    .set('anchorOffset', newFocus)
    .set('focusOffset', newFocus);

  const newEditorState = EditorState.set(
    editorState,
    { selection: newSelection }
  );

  return {
    editorState: newEditorState
  }
};
