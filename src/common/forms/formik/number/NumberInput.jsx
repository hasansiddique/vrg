import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NumberInput extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e){
    e.target.value = parseInt(e.target.value);
    this.props.onChange(e);
  }

  handleBlur(e){
    this.props.onBlur(e);
  }

  render() {
    let { name, value, placeholder, className, onBlur } = this.props;
    return (
      <input 
        type="text"
        name={name}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={value}
        placeholder={placeholder}
        className={className}
      />
    );
  }
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};