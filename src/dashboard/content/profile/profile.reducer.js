import {
  UPDATE_OWNER_PROFILE
} from './profile.actions';

const initialState = {
  profile: null,
  isFetching: false,
  updating: false,
  error: ''
};

const Units = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_PROFILE:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default Units;