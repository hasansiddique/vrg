export const INITIATE_GET_ALL_LISTINGS_REQUEST = 'INITIATE_GET_ALL_LISTINGS_REQUEST';
export const GET_ALL_LISTINGS_COMPLETED = 'GET_ALL_LISTINGS_COMPLETED';
export const GET_ALL_LISTINGS_FAILED = 'GET_ALL_LISTINGS_FAILED';
export const GET_ALL_LISTINGS_ERROR = 'GET_ALL_LISTINGS_ERROR';

export const initiateGetAllProperties = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_ALL_LISTINGS_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getAllPropertiesCompleted = (properties) => {
  return dispatch => {
    dispatch({
      type: GET_ALL_LISTINGS_COMPLETED,
      properties: properties,
      isFetching: false
    });
  };
};

export const getAllPropertiesFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_LISTINGS_FAILED,
      isFetching: false
    });
  };
};

export const getAllPropertiesError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_ALL_LISTINGS_ERROR,
      error: error
    });
  };
};
