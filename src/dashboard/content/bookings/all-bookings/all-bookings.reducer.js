import {
  INITIATE_GET_ALL_BOOKINGS,
  GET_ALL_BOOKINGS_COMPLETED,
  GET_ALL_BOOKINGS_FAILED,
} from './all-bookings.action';

const initialState = {
  isFetching: false,
  list: {},
  error: {},
};

const allBookings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_ALL_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_ALL_BOOKINGS_COMPLETED:
      return Object.assign({}, state, {
        list: action.list,
        isFetching: action.isFetching,
      });

    case GET_ALL_BOOKINGS_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    default:
      return state;
  }
};

export default allBookings;
