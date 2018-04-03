import {combineReducers} from 'redux';

import newBookings from './new-bookings/new-bookings.reducer';
import approvedBookings from './approved-bookings/approved-bookings.reducer';
import cancelledBookings from './cancelled-bookings/cancelled-bookings.reducer';
import completedBookings from './completed-bookings/completed-bookings.reducer';
import allBookings from './all-bookings/all-bookings.reducer';
import rentalInfo from './rental-info/rental-info.reducer';
import tenantInfo from './tenant-info/tenant-info.reducer';

let bookings = combineReducers({
  approvedBookings,
  newBookings,
  cancelledBookings,
  completedBookings,
  allBookings,
  rentalInfo,
  tenantInfo,
});

export default bookings;
