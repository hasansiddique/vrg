import {merge, noop} from 'lodash';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';

export default class ButtonComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

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
      boxSizing: 'border-box',
      minHeight: 30,
      padding: '12px',
      cursor: (this.props.showSpinner || this.props.disabled) ? 'default' : 'pointer',
      borderRadius: 3,
      fontSize: 14,
      textTransform: 'uppercase',
      userSelect: 'none',
      minWidth: 100,
      margin: 0,
      color: '#ffffff',
      backgroundColor: '#0074E1',
      border: '#0a7ed2 1px solid',
      fontWeight: 'bold'
    };
  }

  render() {
    const {showSpinner} = this.props;
    const defaultStyle = this.getDefaultStyles();
    const styles = merge({}, defaultStyle, this.props.style);

    return (
      <button
        id={this.props.id}
        style={styles}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.props.onClick || noop}
        disabled={this.props.disabled || showSpinner}
        type={this.props.type || "button"}>
        {showSpinner ? <PulseLoader size={10} color={'#FFFFFF'}/> : this.props.text}
      </button>
    );
  }
}

ButtonComponent.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  showSpinner: PropTypes.bool,
  disabled: PropTypes.bool,
  spinnerStyles: PropTypes.object,
  hoverStyles: PropTypes.object,
  id: PropTypes.string
};
