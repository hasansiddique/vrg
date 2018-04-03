import {
  INITIATE_GET_UNIT_BREADCRUMB_REQUEST,
  GET_UNIT_BREADCRUMB_COMPLETED,
  GET_UNIT_BREADCRUMB_ERROR,
  GET_UNIT_BREADCRUMB_FAILED
} from './breadcrumb.action';

const initialState = {
  breadcrumb: [],
  isFetching: false,
  error: {}
};

const propertyBreadcrumb = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_UNIT_BREADCRUMB_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_UNIT_BREADCRUMB_COMPLETED:
      return Object.assign({}, state, {
        breadcrumb: action.breadcrumb,
        isFetching: action.isFetching,
      });

    case GET_UNIT_BREADCRUMB_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_UNIT_BREADCRUMB_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default propertyBreadcrumb;
