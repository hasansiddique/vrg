import {connect} from 'react-redux';
import Tenants from './Tenants.jsx';
import {
  getTenants
} from './tenants.actions';
import {setSelectedBookingId} from '../bookings/rental-info/rental-info.action';
import {toggleModalType, toggleModalVisibility} from 'common/components/modal/modal.actions';

const mapStateToProps = state => ({
  tenants: state.advertiserDashboard.tenants.tenants,
  isFetching: state.advertiserDashboard.tenants.isFetching,
  error: state.advertiserDashboard.tenants.error,
  count: state.advertiserDashboard.tenants.count
});
const mapDispatchToProps = (dispatch) => {
  return {
    getTenants: (params) => dispatch(getTenants(params)),
    setSelectedBookingId: (bookingId) => dispatch(setSelectedBookingId(bookingId)),
    toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
    toggleModalType: (type) => dispatch(toggleModalType(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenants);
