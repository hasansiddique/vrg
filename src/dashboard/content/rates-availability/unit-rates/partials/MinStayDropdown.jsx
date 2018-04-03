import React from 'react';
import Select from 'react-select';

export default class MinStayDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(val){
    let { handleMinStay, day } = this.props;
    handleMinStay(val.value, day);
  }

  render() {
    let { day, name, value, options, placeholder, disabled, className, setRef } = this.props;
    return (
      <Select
        ref={c => setRef(c)}
        name={name}
        className={className}
        clearable={false}
        multi={false}
        value={value}
        onChange={this.onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
}
