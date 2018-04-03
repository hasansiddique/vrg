import {connect} from 'react-redux';

import AllAdvertiserBookings from './AllAdvertiserBookings.jsx';
import {initiateGetAllBookings} from './all-bookings.action';
import {setSelectedBookingId} from '../rental-info/rental-info.action';
import {toggleModalType, toggleModalVisibility} from '../../../../common/components/modal/modal.actions';

const mapStateToProps = state => ({
  allBookings: state.advertiserDashboard.bookings.allBookings.list,
  isFetching: state.advertiserDashboard.bookings.allBookings.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetAllBookings: (payload) => dispatch(initiateGetAllBookings(payload)),
  setSelectedBookingId: (bookingId) => dispatch(setSelectedBookingId(bookingId)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllAdvertiserBookings);
