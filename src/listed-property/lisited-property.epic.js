import {combineEpics} from 'redux-observable';

//epics
import {bookingEpics} from './availability-info/availability-calendar/availability-calendar.epic';
import {propertyGalleryEpics} from './property-gallery/property-gallery.epic';
import {propertySummaryEpics} from './layout-summary/layout-summary.epic';
import {propertyDetailsEpics} from './property-details/property-details.epic';
import {propertyFeaturesEpics} from './property-features/property-features.epic';
import {propertyBreadcrumbEpics} from './breadcrumb/breadcrumb.epic';
import {recentUnitEpics} from './recently-visited/recently-visited.epic';
import {propertyReviewEpics} from './property-reviews/property-reviews.epic';
import {propertyInquiryEpics} from './property-inquiry/property-inquiry.epic';

export const listedPropertyEpics = combineEpics(
  bookingEpics,
  propertyGalleryEpics,
  propertySummaryEpics,
  propertyDetailsEpics,
  propertyFeaturesEpics,
  propertyBreadcrumbEpics,
  recentUnitEpics,
  propertyReviewEpics,
  propertyInquiryEpics
);
