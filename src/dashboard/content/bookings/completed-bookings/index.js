import {connect} from 'react-redux';

import CompletedAdvertiserBookings from './CompletedAdvertiserBookings.jsx';
import {initiateGetCompletedBookings} from './completed-bookings.action';
import {toggleModalType, toggleModalVisibility} from "../../../../common/components/modal/modal.actions";
import {setSelectedBookingId} from "../rental-info/rental-info.action";

const mapStateToProps = state => ({
  completedBookings: state.advertiserDashboard.bookings.completedBookings.list,
  isFetching: state.advertiserDashboard.bookings.completedBookings.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetCompletedBookings: (payload) => dispatch(initiateGetCompletedBookings(payload)),
  setSelectedBookingId: (bookingId) => dispatch(setSelectedBookingId(bookingId)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompletedAdvertiserBookings);
