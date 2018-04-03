export const INITIATE_GET_RENTAL_INFO = 'INITIATE_GET_RENTAL_INFO';
export const GET_RENTAL_INFO_COMPLETED = 'GET_RENTAL_INFO_COMPLETED';
export const GET_RENTAL_INFO_FAILED = 'GET_RENTAL_INFO_FAILED';
export const SET_SELECTED_BOOKING_ID = 'SET_SELECTED_BOOKING_ID';

export const initiateGetRentalInfo = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_RENTAL_INFO,
      payload: payload,
      isFetching: true,
    });
  };
};

export const getRentalInfoCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_RENTAL_INFO_COMPLETED,
      details: data,
      isFetching: false,
    });
  };
};

export const getRentalInfoFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_RENTAL_INFO_FAILED,
      error: error,
      isFetching: false,
    });
  };
};

export const setSelectedBookingId = (bookingId) => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_BOOKING_ID,
      bookingId: bookingId,
    });
  };
};
