import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import './JMESPathPlayground.css';
import JMESPathExpression from './JMESPathExpression';
import JMESPathQueryInput from './JMESPathQueryInput';
import JMESPathQueryResult from './JMESPathQueryResult';
import ShareButton from './ShareButton';
import { updateDocument, updateExpression } from '../actions/index';


export class JMESPathPlayground extends React.Component {
  render() {
    const onExprChanged = (expression) => {
      this.props.dispatch(updateExpression(expression));
    };
    const onInputChanged = (inputDoc) => {
      this.props.dispatch(updateDocument(inputDoc));
    };
    return (
      <Grid>
        <Row>
          <Col md={6} mdPush={3} sm={12} xs={12}>
            <JMESPathExpression
              expression={this.props.expression}
              expressionIsValid={this.props.expressionIsValid}
              updateExpression={onExprChanged}
            />
          </Col>
          <Col md={3} mdPush={3} sm={12} xs={12}>
            <ShareButton
              inputDoc={this.props.inputDoc}
              expression={this.props.expression}
              expressionIsValid={this.props.expressionIsValid}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} mdPush={6} sm={6} xs={12}>
            <JMESPathQueryResult queryResult={this.props.result}/>
          </Col>
          <Col md={6} mdPull={6} sm={6} xs={12}>
            <JMESPathQueryInput
              inputDoc={this.props.inputDoc}
              onChange={onInputChanged}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            {/* I'd eventually like to have 3 columns showing
               useful debug info, one of which includes the AST.
               I'd also like to include an execution trace.
               Until I have that fully worked out I have placeholder
               sections, but otherwise I'm keeping this empty.
           <div className="jp-ast">
             <h4>AST</h4>
             <pre>{this.state.ast}</pre>
           </div>
           */}
          </Col>
          <Col md={4}>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({JMESPathPlaygroundReducer}) => JMESPathPlaygroundReducer;

export default connect(mapStateToProps)(JMESPathPlayground);
