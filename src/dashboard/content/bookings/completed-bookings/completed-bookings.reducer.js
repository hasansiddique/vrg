import {
  INITIATE_GET_COMPLETED_BOOKINGS,
  GET_COMPLETED_BOOKINGS_COMPLETED,
  GET_COMPLETED_BOOKINGS_FAILED,
} from './completed-bookings.action';

const initialState = {
  isFetching: false,
  list: {},
  error: {},
};

const completedBookings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_COMPLETED_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_COMPLETED_BOOKINGS_COMPLETED:
      return Object.assign({}, state, {
        list: action.list,
        isFetching: action.isFetching,
      });

    case GET_COMPLETED_BOOKINGS_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    default:
      return state;
  }
};

export default completedBookings;
