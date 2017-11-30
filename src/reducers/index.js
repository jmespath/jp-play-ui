import jmespath from 'jmespath';
import { combineReducers } from 'redux';
import {
  UPDATE_DOCUMENT, UPDATE_EXPRESSION,
  UPDATE_DOCUMENT_AND_EXPRESSION,
} from '../actions/index';

const evaluateExpression = (inputDoc, expression) => {
  let result = null;
  try {
    let input = JSON.parse(inputDoc);
    result = jmespath.search(input, expression);
  } finally {
    return JSON.stringify(result, null, 2);
  }
};

const validateExpression = (newValue) => {
  let astObj = null;
  let astAsJSON = null;
  let expressionIsValid = false;
  try {
    astObj = jmespath.compile(newValue);
    astAsJSON = JSON.stringify(astObj, null, 2);
    expressionIsValid = true;
  } finally {
    return {
      ast: astAsJSON,
      expressionIsValid,
    };
  }
};

const handleUpdateExpression = (state, action) => {
  let { expression } = action;
  let { result, inputDoc } = state;
  let { ast, expressionIsValid } = validateExpression(expression);
  if (expressionIsValid) {
    result = evaluateExpression(inputDoc, expression);
  }
  return {
    ...state,
    ast,
    result,
    expression,
    expressionIsValid,
  };
};

const handleUpdateDocument = (state, action) => {
  let { expression } = state;
  let { inputDoc } = action;
  let result = evaluateExpression(inputDoc, expression);
  return {
    ...state,
    result,
    inputDoc,
  };
};

const handleUpdateDocumentAndExpression = (state, action) => {
  let { expression, inputDoc } = action;
  let { ast, expressionIsValid } = validateExpression(expression);
  let result = evaluateExpression(inputDoc, expression);
  return {
    ...state,
    ast,
    result,
    inputDoc,
    expression,
    expressionIsValid,
  };
};


const DEFAULT_EXPRESSION = 'foo';
const DEFAULT_INPUT_DOC = JSON.stringify({'foo': {'bar': 'baz'}}, null, 2);
const DEFAULT_STATE = {
  inputDoc: DEFAULT_INPUT_DOC,
  expression: DEFAULT_EXPRESSION,
  ...validateExpression(DEFAULT_EXPRESSION),
  result: evaluateExpression(DEFAULT_INPUT_DOC, DEFAULT_EXPRESSION),
};

const JMESPathPlaygroundReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
  case UPDATE_EXPRESSION:
    return handleUpdateExpression(state, action);
  case UPDATE_DOCUMENT:
    return handleUpdateDocument(state, action);
  case UPDATE_DOCUMENT_AND_EXPRESSION:
    return handleUpdateDocumentAndExpression(state, action);
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  JMESPathPlaygroundReducer,
});

export default rootReducer;
