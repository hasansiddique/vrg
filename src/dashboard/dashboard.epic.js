import {combineEpics} from 'redux-observable';

//epics
import {bookingEpics} from './content/bookings/bookings.epic';
import {ratesAvailabilityEpics} from './content/rates-availability/rates-availability.epic';

export const advertiserDashboardEpics = combineEpics(
  bookingEpics,
  ratesAvailabilityEpics
);
