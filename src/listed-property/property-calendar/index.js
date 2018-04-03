import {connect} from 'react-redux';

import PropertyCalendar from './PropertyCalendar.jsx';
import {
  initiateGetAvailabilityInfo,
} from "../availability-info/availability-calendar/availability-calendar.action";

const mapStateToProps = state => ({
  listingInfo: state.listedProperty.availabilityInfo.listingInfo,
  isFetching: state.listedProperty.availabilityInfo.isFetching,
  availabilityError: state.listedProperty.availabilityInfo.availabilityError,
  isMobile: state.ui.isMobile,
});

const mapDispatchToProps = dispatch => ({
  initiateGetAvailabilityInfo: (payload) => dispatch(initiateGetAvailabilityInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCalendar);
