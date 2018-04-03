import {
  INITIATE_GET_NEW_BOOKINGS,
  GET_NEW_BOOKINGS_COMPLETED,
  GET_NEW_BOOKINGS_FAILED
} from './new-bookings.action';

const initialState = {
  isFetching: false,
  list: {},
  error: {},
};

const newBookings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_NEW_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_NEW_BOOKINGS_COMPLETED:
      return Object.assign({}, state, {
        list: action.list,
        isFetching: action.isFetching,
      });

    case GET_NEW_BOOKINGS_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    default:
      return state;
  }
};

export default newBookings;
