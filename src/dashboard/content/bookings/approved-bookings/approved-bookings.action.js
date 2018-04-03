export const INITIATE_GET_APPROVED_BOOKINGS = 'INITIATE_GET_APPROVED_BOOKINGS';
export const GET_APPROVED_BOOKINGS_COMPLETED = 'GET_APPROVED_BOOKINGS_COMPLETED';
export const GET_APPROVED_BOOKINGS_FAILED = 'GET_APPROVED_BOOKINGS_FAILED';

export const initiateGetApprovedBookings = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_APPROVED_BOOKINGS,
      payload: payload,
      isFetching: true,
    });
  };
};

export const getApprovedBookingsCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_APPROVED_BOOKINGS_COMPLETED,
      list: data,
      isFetching: false,
    });
  };
};

export const getApprovedBookingsFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_APPROVED_BOOKINGS_FAILED,
      error: error,
      isFetching: false,
    });
  };
};
