export const INITIATE_GET_NEW_BOOKINGS = 'INITIATE_GET_NEW_BOOKINGS';
export const GET_NEW_BOOKINGS_COMPLETED = 'GET_NEW_BOOKINGS_COMPLETED';
export const GET_NEW_BOOKINGS_FAILED = 'GET_NEW_BOOKINGS_FAILED';

export const initiateGetNewBookings = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_NEW_BOOKINGS,
      payload: payload,
      isFetching: true,
    });
  };
};

export const getNewBookingsCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_NEW_BOOKINGS_COMPLETED,
      list: data,
      isFetching: false,
    });
  };
};

export const getNewBookingsFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_NEW_BOOKINGS_FAILED,
      error: error,
      isFetching: false,
    });
  };
};
