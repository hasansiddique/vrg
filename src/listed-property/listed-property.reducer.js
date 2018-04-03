import {combineReducers} from 'redux';

// reducers
import availabilityInfo from './availability-info/availability-calendar/availability-calendar.reducer';
import propertyGallery from './property-gallery/property-gallery.reducer';
import propertySummary from './layout-summary/layout-summary.reducer';
import propertyDetails from './property-details/property-details.reducer';
import propertyFeatures from './property-features/property-features.reducer';
import propertyReviews from './property-reviews/property-reviews.reducer';
import breadcrumb from './breadcrumb/breadcrumb.reducer';
import recentUnits from './recently-visited/recently-visited.reducer';
import propertyInquiry from './property-inquiry/property-inquiry.reducer';
import propertyBedsAndBaths from './beds-and-baths/beds-and-baths.reducer';

const listedPropertyReducers = combineReducers({
  availabilityInfo,
  propertyGallery,
  propertySummary,
  propertyDetails,
  propertyFeatures,
  breadcrumb,
  recentUnits,
  propertyReviews,
  propertyInquiry,
  propertyBedsAndBaths
});

export default listedPropertyReducers;
