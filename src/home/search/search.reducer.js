import {
  FETCH_LOCATIONS_LIST,
  UPDATE_LOCATIONS_LIST,
  UPDATE_SEARCH_CHECKOUT_DATE,
  UPDATE_SEARCH_CHECKIN_DATE,
  INITIATE_SEARCH_FOR_LOCATIONS
} from './search.action';

import {
  UPDATE_SEARCHED_LOCATION
} from './destinations/destinations.action';

const initialState = {
  checkInDate: {},
  checkOutDate: {},
  isSearching: false,
  locationsList: [],
  isFetchingLocations: false,
  searchedLocation: {}
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_LIST:
      return Object.assign({}, state, {
        isFetchingLocations: action.isFetchingLocations
      });

    case INITIATE_SEARCH_FOR_LOCATIONS:
      return Object.assign({}, state, {
        isSearching: action.isSearching
      });

    case UPDATE_LOCATIONS_LIST:
      return Object.assign({}, state, {
        locationsList: action.locationsList,
        isFetchingLocations: action.isFetchingLocations
      });

    case UPDATE_SEARCH_CHECKIN_DATE:
      return Object.assign({}, state, {
        checkInDate: action.checkInDate
      });

    case UPDATE_SEARCH_CHECKOUT_DATE:
      return Object.assign({}, state, {
        checkOutDate: action.checkOutDate
      });

    case UPDATE_SEARCHED_LOCATION:
      return Object.assign({}, state, {
        searchedLocation: action.searchedLocation
      });

    default:
      return state;
  }
};

export default search;
