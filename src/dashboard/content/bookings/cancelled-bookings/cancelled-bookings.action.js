export const INITIATE_GET_CANCELLED_BOOKINGS = 'INITIATE_GET_CANCELLED_BOOKINGS';
export const GET_CANCELLED_BOOKINGS_COMPLETED = 'GET_CANCELLED_BOOKINGS_COMPLETED';
export const GET_CANCELLED_BOOKINGS_FAILED = 'GET_CANCELLED_BOOKINGS_FAILED';

export const initiateGetCancelledBookings = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_CANCELLED_BOOKINGS,
      payload: payload,
      isFetching: true,
    });
  };
};

export const getCancelledBookingsCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_CANCELLED_BOOKINGS_COMPLETED,
      list: data,
      isFetching: false,
    });
  };
};

export const getCancelledBookingsFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_CANCELLED_BOOKINGS_FAILED,
      error: error,
      isFetching: false,
    });
  };
};
