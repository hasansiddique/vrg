import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class TopSpinner extends PureComponent {
  render() {
    const {isLoading, isLogging, isFetchingPD} = this.props;

    return (
      <div id="top-level-spiner">
        {(isLoading || isLogging || isFetchingPD) && (
          <div className="top-level-spinner">
            <div className="spinner">
              <div className="loading-text">
                <span>Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TopSpinner.propTypes = {
  isLoading: PropTypes.bool,
  isLogging: PropTypes.bool,
  isFetchingPD: PropTypes.bool,
};

TopSpinner.defaultProps = {
  isFetchingPD: true
};

export default TopSpinner;
