// lodash
import {
  isEmpty,
  attempt,
  each,
  isArray,
  isObject,
  isString,
  camelCase,
  snakeCase,
  isError
} from 'lodash';

// imports
import React from 'react';

const transformKeys = {
  toCamelCase: function (body) {
    return isEmpty(body) ? body : _transform(body, camelCase);
  },
  toSnakeCase: function (body) {
    return isEmpty(body) ? body : _transform(body, snakeCase);
  },
  toLowerCase: function(body){
    return isEmpty(body) ? body : _transform(body, (val) => `${val}`.toLowerCase());
  }
};

function _transform(body, transformFn) {
  body = isError(attempt(JSON.parse.bind(null, body))) ? body : JSON.parse(body);
  if (isArray(body)) {
    each(body, function (obj) {
      transformObj(obj);
    });
  } else if (isObject(body)) {
    transformObj(body);
  }

  return body;

  function transformObj(obj) {
    each(obj, function (value, key) {
      delete obj[key]; // delete first because 1-word keys don't change
      obj[transformFn(key)] = value;
      if (!isString(value)) {
        transformObj(value);
      }
    });
  }
}

export default transformKeys;
