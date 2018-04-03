import {connect} from 'react-redux';

import CancelledAdvertiserBookings from './CancelledAdvertiserBookings.jsx';
import {initiateGetCancelledBookings} from './cancelled-bookings.action';
import {toggleModalType, toggleModalVisibility} from "../../../../common/components/modal/modal.actions";
import {setSelectedBookingId} from "../rental-info/rental-info.action";

const mapStateToProps = state => ({
  cancelledBookings: state.advertiserDashboard.bookings.cancelledBookings.list,
  isFetching: state.advertiserDashboard.bookings.cancelledBookings.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetCancelledBookings: (payload) => dispatch(initiateGetCancelledBookings(payload)),
  setSelectedBookingId: (bookingId) => dispatch(setSelectedBookingId(bookingId)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CancelledAdvertiserBookings);
