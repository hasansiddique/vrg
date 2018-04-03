export const INITIATE_GET_SEARCH_LISTINGS = 'INITIATE_GET_SEARCH_LISTINGS';
export const GET_SEARCH_LISTINGS_COMPLETED = 'GET_SEARCH_LISTINGS_COMPLETED';
export const GET_SEARCH_LISTINGS_FAILED = 'GET_SEARCH_LISTINGS_FAILED';
export const GET_SEARCH_LISTINGS_ERROR = 'GET_SEARCH_LISTINGS_ERROR';

export const initiateGetSearchListings = (params = {}, reset = false) => {
  return dispatch => {
    if(reset === true){
      dispatch(getSearchListingsCompleted([], 0));
    }
    dispatch({
      type: INITIATE_GET_SEARCH_LISTINGS,
      isFetching: true,
      params: params,
      append: !reset
    });
  };
};

export const getSearchListingsCompleted = (listings, count, append = false) => {
  return dispatch => {
    dispatch({
      type: GET_SEARCH_LISTINGS_COMPLETED,
      listings: listings,
      isFetching: false,
      count: count ? count : 0,
      append: append
    });
  };
};

export const getSearchListingsFailed = () => {
  return dispatch => {
    dispatch(getSearchListingsErrorAction());
  };
};

export const getSearchListingsErrorAction = () => {
  return {
    type: GET_SEARCH_LISTINGS_FAILED,
    isFetching: false
  };
};

export const getSearchListingsError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_SEARCH_LISTINGS_ERROR,
      error: error
    });
  };
};
