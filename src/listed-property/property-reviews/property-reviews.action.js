export const INITIATE_GET_PROPERTY_REVIEW_REQUEST = 'INITIATE_GET_PROPERTY_REVIEW_REQUEST';
export const GET_AVAILABILITY_PROPERTY_REVIEW_COMPLETED = 'GET_AVAILABILITY_PROPERTY_REVIEW_COMPLETED';
export const GET_AVAILABILITY_PROPERTY_REVIEW_FAILED = 'GET_AVAILABILITY_PROPERTY_REVIEW_FAILED';
export const GET_AVAILABILITY_PROPERTY_REVIEW_ERROR = 'GET_AVAILABILITY_PROPERTY_REVIEW_ERROR';

export const initiateGetPropertyReviews = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_PROPERTY_REVIEW_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getPropertyReviewsCompleted = (reviews) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_PROPERTY_REVIEW_COMPLETED,
      reviews: reviews,
      isFetching: false
    });
  };
};

export const getPropertyReviewsFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_PROPERTY_REVIEW_FAILED,
      isFetching: false
    });
  };
};

export const getPropertyReviewsError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_PROPERTY_REVIEW_ERROR,
      error: error
    });
  };
};
