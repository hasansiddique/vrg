import {
  INITIATE_GET_DESTINATION_DRILLDOWN,
  GET_DESTINATION_DRILLDOWN_COMPLETED,
  GET_DESTINATION_DRILLDOWN_FAILED,
  GET_DESTINATION_DRILLDOWN_ERROR,
  RESET_DESTINATION_DRILLDOWN
} from './destination.action';

const initialState = {
  data: [],
  isFetching: false,
  error: ''
};

const destinationDrilldown = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_DESTINATION_DRILLDOWN:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_DESTINATION_DRILLDOWN_COMPLETED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        data: action.data
      });

    case GET_DESTINATION_DRILLDOWN_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_DESTINATION_DRILLDOWN_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case RESET_DESTINATION_DRILLDOWN:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};

export default destinationDrilldown;