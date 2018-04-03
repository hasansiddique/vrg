import {
  UPDATE_OWNER_UNITS
} from './units.actions';

const initialState = {
  units: [],
  isFetching: false,
  error: '',
  count: 0
};

const Units = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNITS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Units;