import React, {Component} from 'react';
import {Route} from 'react-router';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import UserProfile from './user-profile';
import Units from "./units";
import Unit from './unit';
import AdvertiserBookings from "../content/bookings";
import RatesAvailability from "../content/rates-availability";
import Profile from './profile';
import Tenants from './tenants';
import Advertisements from "./advertisements";
import Deals from "./deals";

class DashboardContent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let { isAuthenticated } = this.props;
    if(isAuthenticated === false){
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: '/' }
        }} />
      );
    }
    return (
      <div id="dashboard-content" style={{ backgroundColor: '#ffffff' }}>
        <div className="tz-2-com tz-2-main">
          <Route path="/dashboard" exact component={UserProfile}/>
          <Route path="/dashboard/units/(add)?" exact component={Units}/>
          <Route path="/dashboard/units/:id([0-9]+)" component={Unit}/>
          <Route path="/dashboard/bookings" component={AdvertiserBookings}/>
          <Route path="/dashboard/rates-availability" exact component={RatesAvailability}/>
          <Route path="/dashboard/rates-availability/:id" component={RatesAvailability}/>
          <Route path="/dashboard/profile" exact component={Profile}/>
          <Route path="/dashboard/tenants" exact component={Tenants}/>
          <Route path="/dashboard/advertisement" component={Advertisements} />
          <Route path="/dashboard/deals" component={Deals} />
        </div>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  isAuthenticated: PropTypes.oneOfType([PropTypes.bool])
};

export default DashboardContent;
