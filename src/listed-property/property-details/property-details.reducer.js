import {
  INITIATE_GET_UNIT_DETAILS_REQUEST,
  GET_AVAILABILITY_UNIT_DETAILS_COMPLETED,
  GET_AVAILABILITY_UNIT_DETAILS_FAILED,
  GET_AVAILABILITY_UNIT_DETAILS_ERROR
} from './property-details.action';

const initialState = {
  details: {},
  isFetching: false,
  error: {}
};

const propertyDetails = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_UNIT_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_DETAILS_COMPLETED:
      return Object.assign({}, state, {
        details: action.details,
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_DETAILS_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_AVAILABILITY_UNIT_DETAILS_ERROR:
      return Object.assign({}, state, {
        error: {msg: action.error}
      });

    default:
      return state;
  }
};

export default propertyDetails;
