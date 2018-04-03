import {connect} from 'react-redux';

import TopSpinner from './TopSpinner.jsx';

const mapStateToProps = state => ({
  isLogging: state.auth.isLogging,
  isFetchingPD: state.listedProperty.propertyDetails.isFetching,
});

export default connect(mapStateToProps)(TopSpinner);
