import React from 'react';

class ScriptEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      script: props.script
    };
  }

  render() {
    return (
      <div className="editor" contentEditable />
    );
  }
};

export default ScriptEditor;
