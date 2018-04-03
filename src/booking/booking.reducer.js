import {
  UPDATE_BOOKING
} from './booking.action';

const initialState = {
  deals: [],
  isFetching: false,
  error: ''
};

const Deals = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOKING:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default Deals;