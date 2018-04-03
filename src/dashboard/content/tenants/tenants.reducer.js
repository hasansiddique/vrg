import {
  UPDATE_OWNER_TENANTS
} from './tenants.actions';

const initialState = {
  tenants: [],
  isFetching: false,
  error: '',
  count: 0
};

const Units = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_TENANTS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Units;