import {
  UPDATE_OWNER_DEALS
} from './deals.actions';

const initialState = {
  deals: [],
  isFetching: false,
  error: '',
  count: 0,
  adding: false,
  updating: false,
  type: 'active'
};

const Deals = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_DEALS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Deals;