export const INITIATE_GET_UNIT_SUMMARY_REQUEST = 'INITIATE_GET_UNIT_SUMMARY_REQUEST';
export const GET_AVAILABILITY_UNIT_SUMMARY_COMPLETED = 'GET_AVAILABILITY_UNIT_SUMMARY_COMPLETED';
export const GET_AVAILABILITY_UNIT_SUMMARY_FAILED = 'GET_AVAILABILITY_UNIT_SUMMARY_FAILED';
export const GET_AVAILABILITY_UNIT_SUMMARY_ERROR = 'GET_AVAILABILITY_UNIT_SUMMARY_ERROR';

export const initiateGetUnitSummary = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_UNIT_SUMMARY_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getUnitSummaryCompleted = (summary) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_SUMMARY_COMPLETED,
      summary: summary,
      isFetching: false
    });
  };
};

export const getUnitSummaryFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_SUMMARY_FAILED,
      isFetching: false
    });
  };
};

export const getUnitSummaryError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_SUMMARY_ERROR,
      error: error
    });
  };
};
