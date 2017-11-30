import {parse as parseQueryString} from 'query-string';
import PlaygroundAPI from '../PlaygroundAPI';

export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const UPDATE_EXPRESSION = 'UPDATE_EXPRESSION';
export const UPDATE_DOCUMENT_AND_EXPRESSION = 'UPDATE_DOCUMENT_AND_EXPRESSION';

export const updateDocument = (inputDoc) => ({
  inputDoc,
  type: 'UPDATE_DOCUMENT',
});

export const updateExpression = (expression) => ({
  expression,
  type: 'UPDATE_EXPRESSION',
});

export const updateDocumentAndExpression = (inputDoc, expression) => ({
  inputDoc,
  expression,
  type: 'UPDATE_DOCUMENT_AND_EXPRESSION',
});

export const fetchFromQueryString = () => dispatch => {
  let queryString = '';
  if (typeof window !== 'undefined') {
    queryString = window.location.search;
  }
  let parsedQueryString = parseQueryString(queryString);
  if (parsedQueryString.u !== undefined) {
    PlaygroundAPI.getAnonymousQuery(parsedQueryString.u)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(body => {
        let inputDoc = JSON.stringify(body.data, null, 2);
        let expression = body.query;
        dispatch(updateDocumentAndExpression(inputDoc, expression));
      });
  }
};
