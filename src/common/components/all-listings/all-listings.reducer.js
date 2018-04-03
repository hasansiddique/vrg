import {
  INITIATE_GET_ALL_LISTINGS_REQUEST,
  GET_ALL_LISTINGS_COMPLETED,
  GET_ALL_LISTINGS_ERROR,
  GET_ALL_LISTINGS_FAILED,
} from './all-listings.action';

const initialState = {
  properties: {},
  isFetching: false,
  error: ''
};

const allListings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_ALL_LISTINGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_ALL_LISTINGS_COMPLETED:
      return Object.assign({}, state, {
        properties: action.properties,
        isFetching: action.isFetching,
      });

    case GET_ALL_LISTINGS_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_ALL_LISTINGS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default allListings;
