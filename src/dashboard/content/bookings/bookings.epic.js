import {combineEpics} from 'redux-observable';

import {getNewBookings} from './new-bookings/new-bookings.epic';
import {getApprovedBookings} from './approved-bookings/approved-bookings.epic';
import {getCancelledBookings} from './cancelled-bookings/cancelled-bookings.epic';
import {getCompletedBookings} from './completed-bookings/completed-bookings.epic';
import {getAllBookings} from './all-bookings/all-bookings.epic';
import {getRentalInfo} from './rental-info/rental-info.epic';
import {getTenantInfo, submitTenantReplay} from './tenant-info/tenant-info.epic';

export const bookingEpics = combineEpics(
  getNewBookings,
  getApprovedBookings,
  getCancelledBookings,
  getCompletedBookings,
  getAllBookings,
  getRentalInfo,
  getTenantInfo,
  submitTenantReplay
);
