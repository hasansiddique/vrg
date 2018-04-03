import {get} from 'lodash';
import {
  INITIATE_GET_HOME_TRAVEL_STARS_REQUEST,
  GET_HOME_TRAVEL_STARS_COMPLETED,
  GET_HOME_TRAVEL_STARS_FAILED,
  GET_HOME_TRAVEL_STARS_ERROR
} from './travel-stars.action';

const initialState = {
  travelStarsList: [],
  isFetching: false,
  error: ''
};

const travelStars = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_TRAVEL_STARS_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_TRAVEL_STARS_COMPLETED:
      return Object.assign({}, state, {
        travelStarsList: get(action, 'travelStars.tspost') || [],
        isFetching: action.isFetching
      });

    case GET_HOME_TRAVEL_STARS_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_TRAVEL_STARS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      });

    default:
      return state;
  }
};

export default travelStars;
