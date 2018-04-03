import {
  UPDATE_OWNER_USER_PROFILE
} from './userprofile.actions';

const initialState = {
  counters: [],
  isFetching: false,
  error: ''
};

const UserProfile = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_USER_PROFILE:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default UserProfile;