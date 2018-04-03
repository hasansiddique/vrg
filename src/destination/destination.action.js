export const INITIATE_GET_DESTINATION = 'INITIATE_GET_DESTINATION';
export const GET_DESTINATION_COMPLETED = 'GET_DESTINATION_COMPLETED';
export const GET_DESTINATION_FAILED = 'GET_DESTINATION_FAILED';
export const GET_DESTINATION_ERROR = 'GET_DESTINATION_ERROR';
export const RESET_DESTINATION = 'RESET_DESTINATION';

export const INITIATE_GET_DESTINATION_DRILLDOWN = 'INITIATE_GET_DESTINATION_DRILLDOWN';
export const GET_DESTINATION_DRILLDOWN_COMPLETED = 'GET_DESTINATION_DRILLDOWN_COMPLETED';
export const GET_DESTINATION_DRILLDOWN_FAILED = 'GET_DESTINATION_DRILLDOWN_FAILED';
export const GET_DESTINATION_DRILLDOWN_ERROR = 'GET_DESTINATION_DRILLDOWN_ERROR';
export const RESET_DESTINATION_DRILLDOWN = 'RESET_DESTINATION_DRILLDOWN';

export const INITIATE_GET_DESTINATION_PROPERTIES = 'INITIATE_GET_DESTINATION_PROPERTIES';
export const GET_DESTINATION_PROPERTIES_COMPLETED = 'GET_DESTINATION_PROPERTIES_COMPLETED';
export const GET_DESTINATION_PROPERTIES_FAILED = 'GET_DESTINATION_PROPERTIES_FAILED';
export const GET_DESTINATION_PROPERTIES_ERROR = 'GET_DESTINATION_PROPERTIES_ERROR';
export const RESET_DESTINATION_PROPERTIES = 'RESET_DESTINATION_PROPERTIES';

export const initiateGetDestination = (path, reset = false, searchType = null) => {
  return dispatch => {
    if(reset === true){
      dispatch(getDestinationCompleted([], 0));
    }
    dispatch({
      type: INITIATE_GET_DESTINATION,
      isFetching: true,
      path: path,
      search_type: searchType
    });
  };
};

export const getDestinationCompleted = (data, destdrill) => {
  return dispatch => {
    dispatch({
      type: GET_DESTINATION_COMPLETED,
      data: data,
      isFetching: false
    });
    dispatch({
      type: GET_DESTINATION_DRILLDOWN_COMPLETED,
      data: destdrill,
      isFetching: false
    });
  };
};

export const getDestinationFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_DESTINATION_FAILED,
      isFetching: false
    });
    dispatch({
      type: GET_DESTINATION_DRILLDOWN_FAILED,
      isFetching: false
    });
  };
};

export const getDestinationError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_DESTINATION_ERROR,
      error: error
    });
    dispatch({
      type: GET_DESTINATION_DRILLDOWN_ERROR,
      error: error
    });
  };
};

export const resetDestination = () => {
  return dispatch => {
    dispatch({
      type: RESET_DESTINATION
    });
  };
};


export const initiateGetDestinationProperties = (params = null) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_DESTINATION_PROPERTIES,
      params: params,
      isFetching: true
    });
  };
};

export const getDestinationPropertiesCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_DESTINATION_PROPERTIES_COMPLETED,
      properties: data || [],
      isFetching: false
    });
  };
};

export const getDestinationPropertiesFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_DESTINATION_PROPERTIES_FAILED,
      isFetching: false
    });
  };
};

export const getDestinationPropertiesError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_DESTINATION_PROPERTIES_ERROR,
      error: error
    });
  };
};

export const resetDestinationDrilldown = () => {
  return dispatch => {
    dispatch({
      type: RESET_DESTINATION_DRILLDOWN
    });
  };
};

export const resetDestinationProperties = () => {
  return dispatch => {
    dispatch({
      type: RESET_DESTINATION_PROPERTIES
    });
  };
};
