import {
  Modifier,
  EditorState
} from 'draft-js';

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
