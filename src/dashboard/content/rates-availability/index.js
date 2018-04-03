import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import RatesAvailability from './RatesAvailability.jsx';
import {
  toggleAvailabilityUpdatedStatus,
  getAvailabilityDetailsFailed,
} from "./unit-rates/unit-rates.action";

const mapStateToProps = state => ({});


const mapDispatchToProps = dispatch => ({
  getAvailabilityDetailsFailed: (err) => dispatch(getAvailabilityDetailsFailed(err)),
  toggleAvailabilityUpdatedStatus: (status) => dispatch(toggleAvailabilityUpdatedStatus(status)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RatesAvailability));
