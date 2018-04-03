import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class IncrementCounter extends PureComponent {
  constructor(props) {
    super(props);

    this.updateCounter = this.updateCounter.bind(this);
  }

  updateCounter(increment) {
    this.props.updateCounter(increment);
  }

  render() {
    let {counter, minDisabledAt, maxDisabledAt, wrapperClassName} = this.props;
    wrapperClassName += ' counter';
    let minDisabled = (counter <= minDisabledAt);
    let maxDisabled = (counter >= maxDisabledAt);

    return (
      <div className={wrapperClassName}>
        <button
          onClick={() => {
            if (!minDisabled) this.updateCounter(counter - 1);
          }}
          className={"btn-counter " + (minDisabled ? "disabled" : "")}>
          <i className="fa fa-minus"></i>
        </button>
        <div className="counter-text">
          {counter}
        </div>
        <button
          onClick={() => {
            if (!maxDisabled) this.updateCounter(counter + 1);
          }}
          className={"btn-counter " + (maxDisabled ? "disabled" : "")}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    );
  }
}

IncrementCounter.propTypes = {
  counter: PropTypes.number.isRequired,
  minDisabledAt: PropTypes.number.isRequired,
  maxDisabledAt: PropTypes.number.isRequired,
  updateCounter: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string
};

IncrementCounter.defaultProps = {
  wrapperClassName: ''
};
