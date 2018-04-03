import {combineReducers} from 'redux';
import {
  TOGGLE_SELECTED_NAV_MENU_ITEM
} from './dashboard.action';

import bookings from './content/bookings/bookings.reducer';
import rates from './content/rates-availability/rates-availability.reducer';
import tenants from './content/tenants/tenants.reducer';
import advertisements from './content/advertisements/advertisements.reducer';
import deals from './content/deals/deals.reducer';
import userProfile from './content/user-profile/userprofile.reducer';

const initialState = {
  selectedNavItem: '',
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_NAV_MENU_ITEM:
      return Object.assign({}, state, {
        selectedNavItem: action.selectedNavItem,
      });

    default:
      return state;
  }
};

let advertiserDashboard = combineReducers({
  dashboard,
  bookings,
  rates,
  tenants,
  advertisements,
  deals,
  userProfile
});
export default advertiserDashboard;
