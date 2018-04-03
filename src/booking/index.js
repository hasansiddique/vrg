import {connect} from 'react-redux';

import {
  confirmBooking,
  getStates,
  getCountries
} from './booking.action';
import {
  initiateListingCalculation,
} from '../listed-property/availability-info/availability-calendar/availability-calendar.action';

import Booking from './Booking.jsx';

const mapStateToProps = state => ({
  deals: state.deals.deals,
  isFetching: state.deals.isFetching,
  error: state.deals.error,
  calculationInfo: state.listedProperty.availabilityInfo.calculationInfo,
  listingCalculationError: state.listedProperty.availabilityInfo.calculationError,
});

const mapDispatchToProps = dispatch => ({
  confirmBooking: (params) => dispatch(confirmBooking(params)),
  getStates: () => dispatch(getStates()),
  getCountries: () => dispatch(getCountries()),
  initiateListingCalculation: (listingId, startDate, endDate, guests, dealId = null) => dispatch(initiateListingCalculation(listingId, startDate, endDate, guests, dealId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
