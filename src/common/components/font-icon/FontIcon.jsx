import React from 'react';
import PropTypes from 'prop-types';

export default class FontIcon extends React.Component {

  static get propTypes() {
    return {
      name: PropTypes.string,
      size: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    let name = this.props.name || '';
    let size = this.props.size || '';
    return (
      <i className={`fa fa-${name} ${`fa-${size}`}`}/>
    );
  }
}
