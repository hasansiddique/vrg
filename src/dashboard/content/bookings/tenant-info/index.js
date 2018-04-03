import {connect} from 'react-redux';

import BookingTenantInfo from './BookingTenantInfo.jsx';
import {
  initiateGetTenantInfo,
  toggleTenantStatusClicked,
  submitTenantBookingReply,
  toggleTenantSubmittingReplyStatus,
} from './tenant-info.action';
import {toggleModalType, toggleModalVisibility} from '../../../../common/components/modal/modal.actions';

const mapStateToProps = state => ({
  bookingId: state.advertiserDashboard.bookings.rentalInfo.bookingId,
  tenantInfo: state.advertiserDashboard.bookings.tenantInfo.details,
  isFetching: state.advertiserDashboard.bookings.tenantInfo.isFetching,
  replyStatus: state.advertiserDashboard.bookings.tenantInfo.replyStatus,
  tenantStatus: state.advertiserDashboard.bookings.tenantInfo.tenantStatus,
  submittingReply: state.advertiserDashboard.bookings.tenantInfo.submittingReply,
});

const mapDispatchToProps = dispatch => ({
  toggleModalType: (type) => dispatch(toggleModalType(type)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  initiateGetTenantInfo: (bookingId) => dispatch(initiateGetTenantInfo(bookingId)),
  toggleTenantStatusClicked: (status) => dispatch(toggleTenantStatusClicked(status)),
  submitTenantBookingReply: (payload) => dispatch(submitTenantBookingReply(payload)),
  toggleTenantSubmittingReplyStatus: (status) => dispatch(toggleTenantSubmittingReplyStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingTenantInfo);
