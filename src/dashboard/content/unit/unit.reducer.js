import { combineReducers } from 'redux';
import General from './general/general.reducer';
import Bedrooms from './bedrooms/bedrooms.reducer';
import Bathrooms from './bathrooms/bathrooms.reducer';
import Guestinfo from './guest-info/guestinfo.reducer';
import Features from './features/features.reducer';
import BaseRate from './base-rate/baserate.reducer';
import CalendarSync from './calendar-sync/calendarsync.reducer';
import Images from './images/images.reducer';

export default combineReducers({
  general: General,
  bedrooms: Bedrooms,
  bathrooms: Bathrooms,
  guestInfo: Guestinfo,
  features: Features,
  images: Images,
  baseRate: BaseRate,
  calendarSync: CalendarSync
});