import {
  INITIATE_GET_HOME_TRANSPORTATION_REQUEST,
  GET_HOME_TRANSPORTATION_COMPLETED,
  GET_HOME_TRANSPORTATION_FAILED,
  GET_HOME_TRANSPORTATION_ERROR,
  SET_HOME_TRANSPORTATION
} from './transportation.action';

const initialState = {
  transportationList: [],
  isFetching: false,
  error: '',
  count: 0
};

const transportation = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_TRANSPORTATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_TRANSPORTATION_COMPLETED:
      return Object.assign({}, state, {
        transportationList: action.transportation,
        isFetching: action.isFetching
      });

    case GET_HOME_TRANSPORTATION_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_TRANSPORTATION_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case SET_HOME_TRANSPORTATION:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default transportation;
