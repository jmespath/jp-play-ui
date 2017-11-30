import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/chrome';
import 'brace/theme/solarized_dark';


const JMESPathQueryResult = (props) => (
  <div>
    <h4>Result</h4>
    <AceEditor
      mode="json"
      theme="solarized_dark"
      width={null}
      className="json-box"
      name="jmespath-result"
      readOnly={true}
      showPrintMargin={false}
      editorProps={{$blockScrolling: Infinity}}
      value={props.queryResult}
    />
  </div>
);

export default JMESPathQueryResult;
