import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

export default class MySelect extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(value){
    let { name } = this.props;
    this.props.onChange(name, value.name || value.value);
  }

  handleBlur(){
    let { name } = this.props;
    this.props.onBlur(name, true);
  }

  render() {
    let { name, options, value } = this.props;
    let filterOptions = createFilterOptions({ options });
    return (
      <Select
        id={name}
        options={options}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        filterOptions={filterOptions}
        value={{value: value, label: value}}
        clearable={false}
      />
    );
  }
}