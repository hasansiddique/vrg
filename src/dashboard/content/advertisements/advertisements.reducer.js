import {
  UPDATE_OWNER_ADVERTISEMENTS
} from './advertisements.actions';

const initialState = {
  advertisements: [],
  isFetching: false,
  error: '',
  count: 0
};

const Units = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_ADVERTISEMENTS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Units;