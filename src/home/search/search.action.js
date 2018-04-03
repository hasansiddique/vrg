export const FETCH_LOCATIONS_LIST = 'FETCH_LOCATIONS_LIST';
export const UPDATE_LOCATIONS_LIST = 'UPDATE_LOCATIONS_LIST';
export const INITIATE_SEARCH_FOR_LOCATIONS = 'INITIATE_SEARCH_FOR_LOCATIONS';
export const UPDATE_SEARCH_CHECKIN_DATE = 'UPDATE_SEARCH_CHECKIN_DATE';
export const UPDATE_SEARCH_CHECKOUT_DATE = 'UPDATE_SEARCH_CHECKOUT_DATE';

export const fetchLocationsList = () => {
  return dispatch => {
    dispatch({
      type: FETCH_LOCATIONS_LIST,
      isFetchingLocations: true
    });
  };
};

export const updateLocationsList = (locations) => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOCATIONS_LIST,
      locationsList: locations,
      isFetchingLocations: false
    });
  };
};

export const initiateSearchForLocations = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_SEARCH_FOR_LOCATIONS,
      payload: payload,
      isSearching: true
    });
  };
};

export const updateCheckInDate = (date) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH_CHECKIN_DATE,
      checkInDate: date
    });
  };
};

export const updateCheckOutDate = (date) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH_CHECKOUT_DATE,
      checkOutDate: date
    });
  };
};
