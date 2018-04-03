import {
  UPDATE_OWNER_UNIT_LOCAL_FEATURES
} from './local-features.actions';

const initialState = {
  features: null,
  isFetching: false,
  error: '',
  isUpdating: false
};

const LocalFeatures = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_LOCAL_FEATURES:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default LocalFeatures;