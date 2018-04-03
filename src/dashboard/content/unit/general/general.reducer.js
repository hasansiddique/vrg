import {
  UPDATE_OWNER_UNIT_GENERAL
} from './general.actions';

const initialState = {
  general: null,
  isFetching: false,
  error: ''
};

const General = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_GENERAL:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default General;