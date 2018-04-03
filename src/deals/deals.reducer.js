import {
  UPDATE_DEALS
} from './deals.action';

const initialState = {
  deals: [],
  isFetching: false,
  error: ''
};

const Deals = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DEALS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default Deals;