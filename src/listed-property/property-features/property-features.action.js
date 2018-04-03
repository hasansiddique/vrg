export const INITIATE_GET_UNIT_FEATURES_REQUEST = 'INITIATE_GET_UNIT_SUMMARY_REQUEST';
export const GET_AVAILABILITY_UNIT_FEATURES_COMPLETED = 'GET_AVAILABILITY_UNIT_FEATURES_COMPLETED';
export const GET_AVAILABILITY_UNIT_FEATURES_FAILED = 'GET_AVAILABILITY_UNIT_FEATURES_FAILED';
export const GET_AVAILABILITY_UNIT_FEATURES_ERROR = 'GET_AVAILABILITY_UNIT_FEATURES_ERROR';

export const initiateGetUnitFeatures = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_UNIT_FEATURES_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getUnitFeaturesCompleted = (features) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_FEATURES_COMPLETED,
      features: features,
      isFetching: false
    });
  };
};

export const getUnitFeaturesFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_FEATURES_FAILED,
      isFetching: false
    });
  };
};

export const getUnitFeaturesError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_FEATURES_ERROR,
      error: error
    });
  };
};
