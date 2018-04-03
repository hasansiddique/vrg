import merge from 'lodash/merge';
import {getSvg} from '../../svg-icons';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Loader from '../loading';

export default class Icon extends PureComponent {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.getIconColor = this.getIconColor.bind(this);

    this.state = {
      hover: false
    };
  }

  onMouseEnter() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  getDefaultStyles() {
    return {
      cursor: 'pointer',
      fontSize: '15px',
      userSelect: 'none',
      padding: '0px 10px'
    };
  }

  getEnhancedStyles(styles) {
    let updatedStyles = {};

    if (this.state.hover) {
      updatedStyles = merge({}, updatedStyles, this.props.hoverStyles || {});
    }
    return merge({}, styles, updatedStyles);
  }

  getIconColor() {
    if (this.state.hover) {
      return this.props.hoverColor || '#FFF';
    }
    return this.props.color || '#B3B8BC';
  }

  render() {
    const {showSpinner, type, spinnerStyles} = this.props;
    const defaultStyle = this.getDefaultStyles();
    const style = merge({}, defaultStyle, this.props.style);
    const styles = this.getEnhancedStyles(style);
    const height = this.props.height || 20;
    const width = this.props.width || 20;

    return (
      <span
        style={styles}
        title={this.props.title}
        onClick={this.props.onClick}
        id={this.props.id}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {showSpinner ? (
          <span>
            <Loader text={this.props.spinnerText} style={spinnerStyles}/>
          </span>) : (
          getSvg(type, width, height, this.getIconColor())
        )}
      </span>
    );

  }
}

Icon.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  showSpinner: PropTypes.bool,
  spinnerText: PropTypes.string,
  spinnerStyles: PropTypes.object,
  hoverColor: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
};
