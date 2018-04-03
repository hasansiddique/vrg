import {connect} from 'react-redux';

import ApprovedAdvertiserBookings from './ApprovedAdvertiserBookings.jsx';
import {initiateGetApprovedBookings} from './approved-bookings.action';
import {toggleModalType, toggleModalVisibility} from "../../../../common/components/modal/modal.actions";
import {setSelectedBookingId} from "../rental-info/rental-info.action";

const mapStateToProps = state => ({
  approvedBookings: state.advertiserDashboard.bookings.approvedBookings.list,
  isFetching: state.advertiserDashboard.bookings.approvedBookings.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetApprovedBookings: (payload) => dispatch(initiateGetApprovedBookings(payload)),
  setSelectedBookingId: (bookingId) => dispatch(setSelectedBookingId(bookingId)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedAdvertiserBookings);
