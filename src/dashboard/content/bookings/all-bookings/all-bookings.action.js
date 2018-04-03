export const INITIATE_GET_ALL_BOOKINGS = 'INITIATE_GET_ALL_BOOKINGS';
export const GET_ALL_BOOKINGS_COMPLETED = 'GET_ALL_BOOKINGS_COMPLETED';
export const GET_ALL_BOOKINGS_FAILED = 'GET_ALL_BOOKINGS_FAILED';

export const initiateGetAllBookings = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_ALL_BOOKINGS,
      payload: payload,
      isFetching: true,
    });
  };
};

export const getAllBookingsCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_ALL_BOOKINGS_COMPLETED,
      list: data,
      isFetching: false,
    });
  };
};

export const getAllBookingsFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_ALL_BOOKINGS_FAILED,
      error: error,
      isFetching: false,
    });
  };
};
