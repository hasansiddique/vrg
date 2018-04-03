import { combineReducers } from 'redux';
import MainFeatures from './main-features/main-features.reducer';
import LocalFeatures from './local-features/local-features.reducer';
import CommunityFeatures from './community-features/community-features.reducer';

export default combineReducers({
  main: MainFeatures,
  local: LocalFeatures,
  community: CommunityFeatures
});