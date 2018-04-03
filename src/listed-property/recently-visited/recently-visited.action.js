export const INITIATE_GET_RECENT_UNI_REQUEST = 'INITIATE_GET_RECENT_UNI_REQUEST';
export const GET_AVAILABILITY_RECENT_UNI_COMPLETED = 'GET_AVAILABILITY_RECENT_UNI_COMPLETED';
export const GET_AVAILABILITY_RECENT_UNI_FAILED = 'GET_AVAILABILITY_RECENT_UNI_FAILED';
export const GET_AVAILABILITY_RECENT_UNI_ERROR = 'GET_AVAILABILITY_RECENT_UNI_ERROR';

export const initiateGetRecentUnits = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_RECENT_UNI_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getRecentUnitsCompleted = (units) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_RECENT_UNI_COMPLETED,
      units: units,
      isFetching: false
    });
  };
};

export const getRecentUnitsFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_RECENT_UNI_FAILED,
      isFetching: false
    });
  };
};

export const getRecentUnitsError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_RECENT_UNI_ERROR,
      error: error
    });
  };
};
