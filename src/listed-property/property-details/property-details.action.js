export const INITIATE_GET_UNIT_DETAILS_REQUEST = 'INITIATE_GET_UNIT_SUMMARY_REQUEST';
export const GET_AVAILABILITY_UNIT_DETAILS_COMPLETED = 'GET_AVAILABILITY_UNIT_DETAILS_COMPLETED';
export const GET_AVAILABILITY_UNIT_DETAILS_FAILED = 'GET_AVAILABILITY_UNIT_DETAILS_FAILED';
export const GET_AVAILABILITY_UNIT_DETAILS_ERROR = 'GET_AVAILABILITY_UNIT_DETAILS_ERROR';

export const initiateGetUnitDetails = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_UNIT_DETAILS_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getUnitDetailsCompleted = (details) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_DETAILS_COMPLETED,
      details: details,
      isFetching: false
    });
  };
};

export const getUnitDetailsFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_DETAILS_FAILED,
      isFetching: false
    });
  };
};

export const getUnitDetailsError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_DETAILS_ERROR,
      error: error
    });
  };
};
