import {
  INITIATE_GET_RENTAL_INFO,
  GET_RENTAL_INFO_COMPLETED,
  GET_RENTAL_INFO_FAILED,
  SET_SELECTED_BOOKING_ID,
} from './rental-info.action';

const initialState = {
  isFetching: false,
  details: {},
  error: {},
  bookingId: 0
};

const rentalInfo = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_RENTAL_INFO:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_RENTAL_INFO_COMPLETED:
      return Object.assign({}, state, {
        details: action.details,
        isFetching: action.isFetching,
      });

    case GET_RENTAL_INFO_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    case SET_SELECTED_BOOKING_ID:
      return Object.assign({}, state, {
        bookingId: action.bookingId,
      });

    default:
      return state;
  }
};

export default rentalInfo;
