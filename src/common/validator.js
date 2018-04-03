/* eslint-disable react/no-multi-comp */

import React from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import {forEach, size} from "lodash";

export const required = (value, props) => {
  if (!value.toString().trim().length) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">* Required</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const cleanString = (value, props) => {
  if (value.toString() && !value.toString().match(/^(?!\s*$)[-a-zA-Z0-9_,.\s]{1,100}$/ig)) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">Special charecters are not allowed</span>;
  }
  props.checkerror && props.checkerror(false);
};

export const email = (value, props) => {
  if (!validator.isEmail(value)) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">Not a valid email</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const lt = (value, props) => {
  if (value.toString().trim().length > props.maxLength) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">Value must not exceed {props.maxLength} characters</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const ltv = (value, props, components) => {
  if (parseInt(value) > props.maxValue) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">Value must not be greater than {props.maxValue}</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const gtv = (value, props, components) => {
  if (parseInt(value) < props.minValue) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">Value must be greater than {props.minValue}</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const gt = (value, props) => {
  if (value.toString().trim().length < props.minLength) {
    props.checkerror && props.checkerror(false);
    return <span className="error validation-error">Value must be {props.minLength} least</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const checkLimit = (value, props) => {
  if (value.toString().trim() < props.min || value.toString().trim() > props.max) {
    props.checkerror && props.checkerror(false);
    return <span className="error">Value must be between {props.min} and {props.max}</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const password = (value, props, components) => {
  let _components = components['undefined'];
  let password1 = _components.find((item) => {
    return item.id === 'adPass';
  });
  if (value !== password1.value) {
    return <span className="error validation-error">Passwords are not equal.</span>;
  }
};

export const confirmPassword = (value, props, components) => {
  let passwordKey = props.passwordkey;
  let password = components[passwordKey][0].value;
  if (password !== value) {
    return <span className="error validation-error">Passwords do not match.</span>;
  }
};

export const isNumeric = (value, props, components) => {
  if (!validator.isNumeric(value.toString())) {
    return <span className="error validation-error">Not a valid number</span>;
  }
  props.checkerror && props.checkerror(true);
};

export const checkFormErrors = (formItems) => {
  let errorStack = [];
  forEach(formItems, (item) => {
    if (item && item.error) {
      errorStack.push(item.error);
    }
  });
  return (size(errorStack) === 0);
};

email.propTypes = {
  checkerror: PropTypes.func,
};

required.propTypes = {
  checkerror: PropTypes.func,
};

gt.propTypes = {
  checkerror: PropTypes.func,
  minLength: PropTypes.number,
};

lt.propTypes = {
  checkerror: PropTypes.func,
  maxLength: PropTypes.number,
};

ltv.propTypes = {
  checkerror: PropTypes.func,
  maxValue: PropTypes.number,
};

gtv.propTypes = {
  checkerror: PropTypes.func,
  minValue: PropTypes.number,
};

confirmPassword.propTypes = {
  passwordkey: PropTypes.string.isRequired
};

/* eslint-enable react/no-multi-comp */
