import {

  INITIATE_GET_PROPERTY_REVIEW_REQUEST,
  GET_AVAILABILITY_PROPERTY_REVIEW_COMPLETED,
  GET_AVAILABILITY_PROPERTY_REVIEW_ERROR,
  GET_AVAILABILITY_PROPERTY_REVIEW_FAILED
} from './property-reviews.action';

const initialState = {
  reviews: {},
  isFetching: false,
  error: {}
};

const propertyReviews = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_PROPERTY_REVIEW_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_PROPERTY_REVIEW_COMPLETED:
      return Object.assign({}, state, {
        reviews: action.reviews,
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_PROPERTY_REVIEW_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_AVAILABILITY_PROPERTY_REVIEW_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default propertyReviews;
