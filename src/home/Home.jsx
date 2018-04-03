import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { Route } from 'react-router';
import { Helmet } from 'react-helmet';

// Custom imports
import HomeTopHead from "./top-head";
import HomeFeatures from "./features/HomeFeatures.jsx";
import AdRestaurnats from "../common/components/restaurants";
import AdThingsToDo from "../common/components/things-todo";
import AdShopping from "../common/components/shopping";
import AdTransportation from "../common/components/transportation";
import AdOthers from "../common/components/others";
import FeaturedProperties from "../common/components/properties";
import TravelStars from "../common/components/travel-stars";
import InsideDrilldown from '../destination/partials/InsideDrilldown.jsx';
import Register from 'common/authentication/register';
import Login from 'common/authentication/login';
import ForgotPassword from 'common/authentication/forgot-password';

class HomePage extends Component {
  static get propTypes() {
    return {
      destinationDrilldown: PropTypes.object.isRequired,
      initiateGetDestination: PropTypes.func.isRequired,
      isMobile: PropTypes.bool
    };
  }

  constructor() {
    super();
  }

  componentDidMount() {
    this.loadDestination();
  }

  loadDestination() {
    let {initiateGetDestination} = this.props;
    initiateGetDestination('home');
  }

  render() {
    const maxHomePageAdRecords = 5,
      gId = 0;
    let {destinationDrilldown, isMobile} = this.props;

    return (
      <div className="home-page">
        <Helmet>
          <title>VRguest: Vacation Rentals | No Booking Fees</title>
        </Helmet>
        <HomeTopHead isMobile={isMobile}/>
        <HomeFeatures/>
        <AdRestaurnats gId={gId} maxRecords={maxHomePageAdRecords} recordCategory={3} fullPage={false}/>
        <AdThingsToDo gId={gId} maxRecords={maxHomePageAdRecords} recordCategory={4} fullPage={false}/>
        <AdShopping gId={gId} maxRecords={maxHomePageAdRecords} recordCategory={5} fullPage={false}/>
        <AdTransportation gId={gId} maxRecords={maxHomePageAdRecords} recordCategory={6} fullPage={false}/>
        <AdOthers gId={gId} maxRecords={maxHomePageAdRecords} recordCategory={7} fullPage={false}/>
        <FeaturedProperties gId={gId} maxRecords={10} fullPage={false}/>
        <InsideDrilldown title={'Continents'} drilldown={destinationDrilldown}/>
        <TravelStars/>
        <Route path="/register" component={Register} />
        <Route path="/login" render={Login} />
        <Route path="/forgot-password" render={ForgotPassword} />
      </div>
    );
  }
}

export default HomePage;
