export const INITIATE_GET_HOME_PROPERTIES_REQUEST = 'INITIATE_GET_HOME_PROPERTIES_REQUEST';
export const GET_HOME_PROPERTIES_COMPLETED = 'GET_HOME_PROPERTIES_COMPLETED';
export const GET_HOME_PROPERTIES_FAILED = 'GET_HOME_PROPERTIES_FAILED';
export const GET_HOME_PROPERTIES_ERROR = 'GET_HOME_PROPERTIES_ERROR';

export const initiateGetHomeProperties = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_PROPERTIES_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getHomePropertiesCompleted = (properties) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_PROPERTIES_COMPLETED,
      properties: properties,
      isFetching: false
    });
  };
};

export const getHomePropertiesFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_PROPERTIES_FAILED,
      isFetching: false
    });
  };
};

export const getHomePropertiesError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_PROPERTIES_ERROR,
      error: error
    });
  };
};
