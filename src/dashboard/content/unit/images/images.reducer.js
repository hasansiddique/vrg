import {
  UPDATE_OWNER_UNIT_IMAGES
} from './images.actions';

const initialState = {
  images: [],
  isFetching: false,
  error: ''
};

const Bedrooms = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_IMAGES:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Bedrooms;