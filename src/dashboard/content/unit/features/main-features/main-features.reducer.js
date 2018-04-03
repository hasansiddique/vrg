import {
  UPDATE_OWNER_UNIT_MAIN_FEATURES
} from './main-features.actions';

const initialState = {
  features: null,
  isFetching: false,
  error: '',
  isUpdating: false
};

const MainFeatures = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_MAIN_FEATURES:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default MainFeatures;