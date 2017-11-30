import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/chrome';
import 'brace/theme/solarized_dark';


const JMESPathQueryInput = (props) => (
  <div>
    <h4>Input JSON</h4>
    <AceEditor
      mode="json"
      theme="chrome"
      width={null}
      className="json-box"
      name="input-json-doc"
      onChange={props.onChange}
      editorProps={{$blockScrolling: Infinity}}
      value={props.inputDoc}
    />
  </div>
);

export default JMESPathQueryInput;
