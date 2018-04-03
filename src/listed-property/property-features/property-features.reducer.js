import {
  INITIATE_GET_UNIT_FEATURES_REQUEST,
  GET_AVAILABILITY_UNIT_FEATURES_COMPLETED,
  GET_AVAILABILITY_UNIT_FEATURES_FAILED,
  GET_AVAILABILITY_UNIT_FEATURES_ERROR
} from './property-features.action';

const initialState = {
  features: {},
  isFetching: false,
  error: {}
};

const propertyFeatures = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_UNIT_FEATURES_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_FEATURES_COMPLETED:
      return Object.assign({}, state, {
        features: action.features,
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_FEATURES_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_AVAILABILITY_UNIT_FEATURES_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default propertyFeatures;
