import {
  INITIATE_GET_HOME_PROPERTIES_REQUEST,
  GET_HOME_PROPERTIES_COMPLETED,
  GET_HOME_PROPERTIES_FAILED,
  GET_HOME_PROPERTIES_ERROR
} from './properties.action';

const initialState = {
  propertiesList: [],
  isFetching: false,
  error: ''
};

const properties = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_PROPERTIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_PROPERTIES_COMPLETED:
      return Object.assign({}, state, {
        propertiesList: action.properties,
        isFetching: action.isFetching
      });

    case GET_HOME_PROPERTIES_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_PROPERTIES_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
};

export default properties;
