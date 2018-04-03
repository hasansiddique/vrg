import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class PageWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="page-wrapper">
        {this.props.children}
      </section>
    );
  }
}

export default PageWrapper;
