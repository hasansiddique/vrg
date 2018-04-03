import {
  UPDATE_OWNER_UNIT_GUEST_INFO
} from './guestinfo.actions';

const initialState = {
  guestInfo: null,
  isFetching: false,
  error: '',
  updating: false
};

const GuestInfo = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_GUEST_INFO:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default GuestInfo;