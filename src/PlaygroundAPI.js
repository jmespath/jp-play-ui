const ANON_API_URL = process.env.REACT_APP_JP_API_URL + 'anon';

const newAnonymousQuery = (inputDoc, expression) => {
  return fetch(ANON_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: expression,
      data: JSON.parse(inputDoc)
    })
  });
};

const getAnonymousQuery = uuid => {
  let fullUrl = ANON_API_URL + '/' + uuid;
  return fetch(fullUrl);
};

export default {
  newAnonymousQuery,
  getAnonymousQuery,
};
