import React from 'react';
import PropTypes from 'prop-types';

export default class FilterValue extends React.Component {
  static get propTypes(){
    return {
      onClick: PropTypes.func,
      name: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { onClick, name, value } = this.props;
    if(!value){
      return null;
    }
    return (
      <div className="filter" onClick={onClick}>
        <span className="value">{name.replace(/_/ig, ' ').toUpperCase()} : {value}</span>
        <span className="clear"><i className="fa fa-close"></i></span>
      </div>
    );
  }
}
