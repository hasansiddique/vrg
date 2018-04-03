import {combineReducers} from 'redux';
import {LOGOUT_USER} from './common/authentication/authentication.action';

// reducers
import home from './home/home.reducer';
import search from './search/search.reducer';
import destination from './destination/destination.reducer';
import destinationProperties from './destination/properties.reducer';
import destinationDrilldown from './destination/drilldown.reducer';
import listedProperty from './listed-property/listed-property.reducer';
import {modal} from './common/components/modal/modal.reducers';
import auth from './common/authentication/authentication.reducer';
import ui from './common/ui.reducer';
import advertisement from './advertisement/advertisement.reducer';
import ownerUnits from './dashboard/content/units/units.reducer';
import ownerUnit from './dashboard/content/unit/unit.reducer';
import userProfile from './dashboard/content/profile/profile.reducer';
import advertiserDashboard from './dashboard/dashboard.reducer';
import deals from './deals/deals.reducer';
import advertisements from './advertisements/advertisements.reducer';
import allListings from './common/components/all-listings/all-listings.reducer';

const reducers = combineReducers({
  home,
  listedProperty,
  search,
  modal,
  auth,
  destination,
  destinationProperties,
  destinationDrilldown,
  ui,
  advertisement,
  ownerUnits,
  ownerUnit,
  advertiserDashboard,
  userProfile,
  deals: deals,
  advertisements,
  allListings,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;
