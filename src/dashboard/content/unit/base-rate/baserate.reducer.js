import {
  UPDATE_OWNER_UNIT_BASE_RATE
} from './baserate.actions';

const initialState = {
  baseRate: null,
  isFetching: false,
  error: '',
  updating: false
};

const BaseRate = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_BASE_RATE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default BaseRate;