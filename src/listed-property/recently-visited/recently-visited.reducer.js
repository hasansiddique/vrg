import {
  INITIATE_GET_RECENT_UNI_REQUEST,
  GET_AVAILABILITY_RECENT_UNI_COMPLETED,
  GET_AVAILABILITY_RECENT_UNI_ERROR,
  GET_AVAILABILITY_RECENT_UNI_FAILED
} from './recently-visited.action';

const initialState = {
  units: {},
  isFetching: false,
  error: {}
};

const recentUnits = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_RECENT_UNI_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_RECENT_UNI_COMPLETED:
      return Object.assign({}, state, {
        units: action.units,
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_RECENT_UNI_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_AVAILABILITY_RECENT_UNI_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default recentUnits;
