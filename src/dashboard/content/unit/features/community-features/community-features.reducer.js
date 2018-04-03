import {
  UPDATE_OWNER_UNIT_COMMUNITY_FEATURES
} from './community-features.actions';

const initialState = {
  features: null,
  isFetching: false,
  error: '',
  isUpdating: false
};

const CommunityFeatures = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_COMMUNITY_FEATURES:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default CommunityFeatures;