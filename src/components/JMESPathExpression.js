import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';


class JMESPathExpression extends React.Component {
  constructor(props) {
    super(props);
    let { expression } = this.props;
    this.state = { expression };
    this.onChangeDebounce = this.onChangeDebounce.bind(this);
  }

  componentWillReceiveProps(props) {
    let { expression } = props;
    this.setState({expression});
  }

  componentWillMount() {
    this.timer = null;
  }

  onChangeDebounce(event) {
    clearTimeout(this.timer);
    let expression = event.target.value;
    this.setState({expression});
    let updateExpr = () => {
      this.props.updateExpression(expression);
    };
    this.timer = setTimeout(updateExpr, 300);
  }

  render() {
    let validationState = this.props.expressionIsValid ? null : 'error';
    return (
      <FormGroup validationState={validationState} >
        <FormControl type="text" placeholder="JMESPath Expression"
          className="JP-expr"
          value={this.state.expression}
          onChange={this.onChangeDebounce} />
      </FormGroup>
    );
  }
}

export default JMESPathExpression;
