import {
  UPDATE_OWNER_UNIT_BATHROOMS
} from './bathrooms.actions';

const initialState = {
  bathrooms: [],
  isFetching: false,
  error: '',
  updating: false,
  deleting: 0
};

const Bedrooms = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_BATHROOMS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Bedrooms;