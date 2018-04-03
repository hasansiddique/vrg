export const INITIATE_GET_UNIT_BREADCRUMB_REQUEST = 'INITIATE_GET_UNIT_BREADCRUMB_REQUEST';
export const GET_UNIT_BREADCRUMB_COMPLETED = 'GET_UNIT_BREADCRUMB_COMPLETED';
export const GET_UNIT_BREADCRUMB_FAILED = 'GET_UNIT_BREADCRUMB_FAILED';
export const GET_UNIT_BREADCRUMB_ERROR = 'GET_UNIT_BREADCRUMB_ERROR';

export const initiateGetUnitBreadcrumb = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_UNIT_BREADCRUMB_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getUnitBreadcrumbCompleted = (breadcrumb) => {
  return dispatch => {
    dispatch({
      type: GET_UNIT_BREADCRUMB_COMPLETED,
      breadcrumb: breadcrumb,
      isFetching: false
    });
  };
};

export const getUnitBreadcrumbFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_UNIT_BREADCRUMB_FAILED,
      isFetching: false
    });
  };
};

export const getUnitBreadcrumbError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_UNIT_BREADCRUMB_ERROR,
      error: error
    });
  };
};
