import {
  UPDATE_OWNER_UNIT_BEDROOMS
} from './bedrooms.actions';

const initialState = {
  bedrooms: [],
  isFetching: false,
  error: '',
  updating: false,
  deleting: 0
};

const Bedrooms = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_BEDROOMS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Bedrooms;