import {
  INITIATE_GET_UNIT_IMAGES_REQUEST,
  GET_AVAILABILITY_UNIT_IMAGES_COMPLETED,
  GET_AVAILABILITY_UNIT_IMAGES_ERROR,
  GET_AVAILABILITY_UNIT_IMAGES_FAILED
} from './property-gallery.action';

const initialState = {
  images: {},
  isFetching: false,
  error: {}
};

const propertyGallery = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_UNIT_IMAGES_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_IMAGES_COMPLETED:
      return Object.assign({}, state, {
        images: action.images,
        isFetching: action.isFetching,
      });

    case GET_AVAILABILITY_UNIT_IMAGES_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      });


    case GET_AVAILABILITY_UNIT_IMAGES_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export default propertyGallery;
