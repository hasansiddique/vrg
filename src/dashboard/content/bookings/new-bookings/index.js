import {connect} from 'react-redux';

import NewAdvertiserBookings from './NewAdvertiserBookings.jsx';
import {
  initiateGetNewBookings
} from "./new-bookings.action";
import {toggleModalType, toggleModalVisibility} from "../../../../common/components/modal/modal.actions";
import {setSelectedBookingId} from "../rental-info/rental-info.action";

const mapStateToProps = state => ({
  newBookings: state.advertiserDashboard.bookings.newBookings.list,
  isFetching: state.advertiserDashboard.bookings.newBookings.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetNewBookings: (payload) => dispatch(initiateGetNewBookings(payload)),
  setSelectedBookingId: (bookingId) => dispatch(setSelectedBookingId(bookingId)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertiserBookings);
