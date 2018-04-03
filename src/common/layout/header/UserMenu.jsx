import {get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import storage from 'common/storage';
import dealsIcon from '../../../theme-assets/images/dashboard/dbl1.png';
import dashboardIcon from '../../../theme-assets/images/dashboard/dbl2.png';
import listingsIcon from '../../../theme-assets/images/dashboard/dbl3.png';
import profileIcon from '../../../theme-assets/images/dashboard/dbl6.png';
import tenantsIcon from '../../../theme-assets/images/dashboard/dbl7.png';

import logoutIcon from '../../../theme-assets/images/dashboard/dbl12.png';
import ratesAvailabilityIcon from '../../../theme-assets/images/dashboard/db21.png';
import advertisementIcon from '../../../theme-assets/images/dashboard/dbl13.png';
import bookingsIcon from '../../../theme-assets/images/dashboard/dbl11.png';

class UserMenu extends Component {
  constructor() {
    super();
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    // @todo this will be update with real checks for routes in future
    window.location = '/';
    this.props.logoutUser();
  }

  render() {
    let userImage = encodeURIComponent(get(storage.get('user'), 'user.image'));
    let imageUrl = `http://s3.amazonaws.com/vrguest-assets/pmlogos/${userImage}`;
    if(!userImage){
      imageUrl = '/images/default-owner.png';
    }
    return (
      <div className="user-menu">
        <div className="row">
          <div className="col-sm-4">
            <NavLink
              exact
              to={`/dashboard`}
              activeClassName="active"
              >
              <img src={dashboardIcon} alt=""/><span>My Account</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink
              to="/dashboard/bookings"
              activeClassName="active">
              <img src={bookingsIcon} alt=""/><span>Bookings</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink
              to="/dashboard/units"
              activeClassName="active">
              <img src={listingsIcon} alt=""/><span>Residential Units</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink to="/dashboard/rates-availability" activeClassName="active">
              <img src={ratesAvailabilityIcon} alt=""/><span>Rates & Availability</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink to={`/dashboard/tenants`} activeClassName="active">
              <img src={tenantsIcon} alt=""/><span>Tenants List</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink 
              activeClassName="active"
              to={`/dashboard/deals`}>
              <img src={dealsIcon} alt=""/><span>Vacation Rental Deals</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink to={`/dashboard/advertisement`} activeClassName="active">
              <img src={advertisementIcon}/><span>Advertisement</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <NavLink to={`/dashboard/profile`} activeClassName="active">
              <img src={profileIcon} alt=""/><span>Profile</span>
            </NavLink>
          </div>
          <div className="col-sm-4">
            <a onClick={this.logout} href="javascript:;">
              <img src={logoutIcon} alt=""/><span>Log Out</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default UserMenu;
