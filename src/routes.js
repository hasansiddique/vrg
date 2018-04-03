import React from 'react';
import {Route} from 'react-router-dom';
import Home from './home';
import ListedProperty from './listed-property';
import Search from './search';
import Destination from './destination';
import About from './static/about';
import ListYourProperty from './static/list-your-property';
import Investment from './static/investment';
import Testimonials from './static/testimonials';
import BeAGuester from './static/be-a-guester';
import FaqOwner from './static/faq-owner';
import FaqGuest from './static/faq-guest';
import AreaInfo from './static/area-info';
import MapSearch from './search/map-search';
import Advertisement from './advertisement';
import Dashboard from './dashboard';
import Deals from './deals';
import Booking from './booking';
import BookingApproval from './booking-approval';
import ContactUs from './static/contact-us';
import Owner from './owner';
import Advertisements from './advertisements';
import AllListings from './common/components/all-listings';
import UnauthorizedPage from './static/unauthorized';

const Routes = () => (
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Home}/>
    <Route path="/register" component={Home}/>
    <Route path="/forgot-password" component={Home}/>
    <Route path="/listings/:listingId" component={ListedProperty}/>
    <Route path="/search/(:destination+)?" component={Search}/>
    <Route path="/map-search/(:destination+)?" component={MapSearch}/>
    <Route path="/destination/:path+" component={Destination}/>
    <Route path="/about" component={About}/>
    <Route path="/investment-oppertunity" component={Investment}/>
    <Route path="/advertisement" component={Advertisement}/>
    <Route path="/approval/booking" component={BookingApproval}/>
    <Route path="/dashboard" component={Dashboard}/>
    <Route path="/faq-owner" component={FaqOwner}/>
    <Route path="/faq-guest" component={FaqGuest}/>
    <Route path="/area-info" component={AreaInfo}/>
    <Route path="/list-your-property" component={ListYourProperty}/>
    <Route path="/vacation-rental-deals/:continent?" component={Deals}/>
    <Route path="/testimonials" component={Testimonials}/>
    <Route path="/traveler" component={BeAGuester}/>
    <Route path="/booking" component={Booking}/>
    <Route path="/contact-us" component={ContactUs}/>
    <Route path="/owner/:ownerId" component={Owner}/>
    <Route path="/advertisements/:advertisementId" component={Advertisements}/>
    <Route path="/all-properties/:unitId/:ownerId" component={AllListings}/>
    <Route path="/unauthorized" component={UnauthorizedPage} />
  </div>
);

export default Routes;
