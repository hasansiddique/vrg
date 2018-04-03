import {
  INITIATE_GET_APPROVED_BOOKINGS,
  GET_APPROVED_BOOKINGS_COMPLETED,
  GET_APPROVED_BOOKINGS_FAILED
} from './approved-bookings.action';

const initialState = {
  isFetching: false,
  list: {},
  error: {},
};

const approvedBookings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_APPROVED_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_APPROVED_BOOKINGS_COMPLETED:
      return Object.assign({}, state, {
        list: action.list,
        isFetching: action.isFetching,
      });

    case GET_APPROVED_BOOKINGS_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    default:
      return state;
  }
};

export default approvedBookings;
