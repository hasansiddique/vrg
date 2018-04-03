import { connect } from 'react-redux';
import BookingApproval from './BookingApproval.jsx';
import { confirmDenyBooking } from './booking-approval.actions';

const mapStateToProps = (store) => {
  return {
    isMobile: store.ui.isMobile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmDenyBooking: (params) => dispatch(confirmDenyBooking(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingApproval);