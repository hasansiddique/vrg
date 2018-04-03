import {
  INITIATE_GET_CANCELLED_BOOKINGS,
  GET_CANCELLED_BOOKINGS_COMPLETED,
  GET_CANCELLED_BOOKINGS_FAILED
} from './cancelled-bookings.action';

const initialState = {
  isFetching: false,
  list: {},
  error: {},
};

const cancelledBookings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_CANCELLED_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_CANCELLED_BOOKINGS_COMPLETED:
      return Object.assign({}, state, {
        list: action.list,
        isFetching: action.isFetching,
      });

    case GET_CANCELLED_BOOKINGS_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    default:
      return state;
  }
};

export default cancelledBookings;
