import React from 'react';
import {Editor, EditorState} from 'draft-js';

class TokenEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      script: EditorState.createEmpty()
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(newState) {
    debugger;
    this.setState({ script: newState })
  }

  render() {
    return <Editor editorState={this.state.script} onChange={this.onChange} />;
  }
}

export default TokenEditor;
