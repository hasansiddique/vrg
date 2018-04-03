export const INITIATE_GET_COMPLETED_BOOKINGS = 'INITIATE_GET_COMPLETED_BOOKINGS';
export const GET_COMPLETED_BOOKINGS_COMPLETED = 'GET_COMPLETED_BOOKINGS_COMPLETED';
export const GET_COMPLETED_BOOKINGS_FAILED = 'GET_COMPLETED_BOOKINGS_FAILED';

export const initiateGetCompletedBookings = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_COMPLETED_BOOKINGS,
      payload: payload,
      isFetching: true,
    });
  };
};

export const getCompletedBookingsCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_COMPLETED_BOOKINGS_COMPLETED,
      list: data,
      isFetching: false,
    });
  };
};

export const getCompletedBookingsFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_COMPLETED_BOOKINGS_FAILED,
      error: error,
      isFetching: false,
    });
  };
};
