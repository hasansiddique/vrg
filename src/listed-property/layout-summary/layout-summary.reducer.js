import {
  INITIATE_GET_UNIT_SUMMARY_REQUEST,
  GET_AVAILABILITY_UNIT_SUMMARY_COMPLETED,
  GET_AVAILABILITY_UNIT_SUMMARY_ERROR,
  GET_AVAILABILITY_UNIT_SUMMARY_FAILED
} from './layout-summary.action';

const initialState = {
  summary: {},
  isFetching: false,
  error: {}
};

const propertySummary = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_UNIT_SUMMARY_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_SUMMARY_COMPLETED:
      return Object.assign({}, state, {
        summary: action.summary,
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_SUMMARY_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_AVAILABILITY_UNIT_SUMMARY_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default propertySummary;
