import {connect} from 'react-redux';

import BookingRentalInfo from './BookingRentalInfo.jsx';
import {initiateGetRentalInfo} from './rental-info.action';
import {toggleModalType, toggleModalVisibility} from "../../../../common/components/modal/modal.actions";

const mapStateToProps = state => ({
  rentalInfo: state.advertiserDashboard.bookings.rentalInfo.details,
  isFetching: state.advertiserDashboard.bookings.rentalInfo.isFetching,
  bookingId: state.advertiserDashboard.bookings.rentalInfo.bookingId,
});

const mapDispatchToProps = dispatch => ({
  toggleModalType: (type) => dispatch(toggleModalType(type)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  initiateGetRentalInfo: (bookingId) => dispatch(initiateGetRentalInfo(bookingId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingRentalInfo);
