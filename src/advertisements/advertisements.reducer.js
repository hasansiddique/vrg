import {
  UPDATE_ADVERTISEMENTS
} from './advertisements.action';

const initialState = {
  advertisements: [],
  isFetching: false,
  error: ''
};

const Deals = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADVERTISEMENTS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default Deals;