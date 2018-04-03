import {
  INITIATE_GET_PROPERTY_INQUIRY_REQUEST,
  GET_PROPERTY_INQUIRY_COMPLETED,
  GET_PROPERTY_INQUIRY_ERROR,
  GET_PROPERTY_INQUIRY_FAILED
} from './property-inquiry.action';

const initialState = {
  inquiry: {},
  isFetching: false,
  error: {}
};

const propertyInquiry = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_PROPERTY_INQUIRY_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_PROPERTY_INQUIRY_COMPLETED:
      return Object.assign({}, state, {
        inquiry: action.inquiry,
        isFetching: action.isFetching,
      });

    case GET_PROPERTY_INQUIRY_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_PROPERTY_INQUIRY_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default propertyInquiry;
