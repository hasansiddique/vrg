import {
  INITIATE_GET_SEARCH_LISTINGS,
  GET_SEARCH_LISTINGS_COMPLETED,
  GET_SEARCH_LISTINGS_FAILED,
  GET_SEARCH_LISTINGS_ERROR
} from './search.action';

const initialState = {
  listings: [],
  isFetching: false,
  error: '',
  count: 0
};

const listings = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_SEARCH_LISTINGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: ''
      });

    case GET_SEARCH_LISTINGS_COMPLETED:
      return Object.assign({}, state, {
        listings: ((action.append === true) ? [...state.listings, ...action.listings] : action.listings),
        isFetching: action.isFetching,
        count: action.count
      });

    case GET_SEARCH_LISTINGS_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_SEARCH_LISTINGS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      });

    default:
      return state;
  }
};

export default listings;
