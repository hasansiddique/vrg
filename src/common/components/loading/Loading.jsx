import {merge} from 'lodash';
import React from 'react';
import {BeatLoader} from 'react-spinners';
import PropTypes from 'prop-types';

const LoadingSimple = (props) => {
  return (
    <div className="spinner-wrapper" style={{margin: '120px auto'}}>
      <BeatLoader
        color={'#0074E1'}
        loading
      />
      <span>Loading...</span>
    </div>
  );
};

class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getDefaultStyles = this.getDefaultStyles.bind(this);
  }

  getDefaultStyles() {
    return {
      style: {margin: '20px auto'}
    };
  }

  render() {
    let {loading, style} = this.props;

    return (
      <div className="spinner-wrapper" style={merge(style, this.getDefaultStyles())}>
        <BeatLoader
          color={'#0074E1'}
          loading={loading}
        />
        <span style={{fontSize: `15px`, fontWeight: `400`, fontFamily: `Poppins`}}>Loading...</span>
      </div>
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

export default Loading;
export {LoadingSimple};
