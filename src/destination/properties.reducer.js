import {
  INITIATE_GET_DESTINATION_PROPERTIES,
  GET_DESTINATION_PROPERTIES_COMPLETED,
  GET_DESTINATION_PROPERTIES_FAILED,
  GET_DESTINATION_PROPERTIES_ERROR,
  RESET_DESTINATION_PROPERTIES
} from './destination.action';

const initialState = {
  properties: [],
  isFetching: false,
  error: ''
};

const destination = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_DESTINATION_PROPERTIES:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_DESTINATION_PROPERTIES_COMPLETED:
      return Object.assign({}, state, {
        properties: action.properties,
        isFetching: action.isFetching
      });

    case GET_DESTINATION_PROPERTIES_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_DESTINATION_PROPERTIES_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case RESET_DESTINATION_PROPERTIES:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};

export default destination;