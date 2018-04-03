import {
  INITIATE_GET_DESTINATION,
  GET_DESTINATION_COMPLETED,
  GET_DESTINATION_FAILED,
  GET_DESTINATION_ERROR,
  RESET_DESTINATION
} from './destination.action';

const initialState = {
  id: null,
  name: null,
  isFetching: false,
  error: ''
};

const destination = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_DESTINATION:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_DESTINATION_COMPLETED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      }, action.data);

    case GET_DESTINATION_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_DESTINATION_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case RESET_DESTINATION:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};

export default destination;