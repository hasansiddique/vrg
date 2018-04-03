import {get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import storage from '../../common/storage';
import dealsIcon from '../../theme-assets/images/dashboard/dbl1.png';
import dashboardIcon from '../../theme-assets/images/dashboard/dbl2.png';
import listingsIcon from '../../theme-assets/images/dashboard/dbl3.png';
import profileIcon from '../../theme-assets/images/dashboard/dbl6.png';
import tenantsIcon from '../../theme-assets/images/dashboard/dbl7.png';

import logoutIcon from '../../theme-assets/images/dashboard/dbl12.png';
import ratesAvailabilityIcon from '../../theme-assets/images/dashboard/db21.png';
import advertisementIcon from '../../theme-assets/images/dashboard/dbl13.png';
import bookingsIcon from '../../theme-assets/images/dashboard/dbl11.png';

class NavMenu extends Component {
  constructor() {
    super();
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  toggleNavMenuItem(item) {
    this.props.toggleSelectedNavItem(item);
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
      <div className="">
        {/*<div className="tz-l-1 hidden-xs">
          <ul>
            <li>
              <div
                style={{
                  height: `250px`,
                  background: `url(${imageUrl})`,
                  backgroundPosition: `center center`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `contain`
                }}
                className="user-image">&nbsp;</div>
            </li>
          </ul>
        </div>*/}
        <div className="user-dashboard-menu">
          <ul className="row">
            {/*<li className="col-sm-3">
              <NavLink
                exact
                to={`/dashboard`}
                activeClassName="tz-lma"
                >
                <img src={dashboardIcon} alt=""/><span>My Account</span>
              </NavLink>
            </li>*/}
            <li className="col-sm-3">
              <NavLink
                to="/dashboard/bookings"
                activeClassName="tz-lma">
                <img src={bookingsIcon} alt=""/><span>Bookings</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <NavLink
                to="/dashboard/units"
                activeClassName="tz-lma">
                <img src={listingsIcon} alt=""/><span>Residential Units</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <NavLink to="/dashboard/rates-availability" activeClassName="tz-lma">
                <img src={ratesAvailabilityIcon} alt=""/><span>Rates & Availability</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <NavLink to={`/dashboard/tenants`} activeClassName="tz-lma">
                <img src={tenantsIcon} alt=""/><span>Tenants List</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <NavLink 
                activeClassName="tz-lma"
                to={`/dashboard/deals`}>
                <img src={dealsIcon} alt=""/><span>Vacation Rental Deals</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <NavLink to={`/dashboard/advertisement`} activeClassName="tz-lma">
                <img src={advertisementIcon}/><span>Advertisement</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <NavLink to={`/dashboard/profile`} activeClassName="tz-lma">
                <img src={profileIcon} alt=""/><span>Profile</span>
              </NavLink>
            </li>
            <li className="col-sm-3">
              <a onClick={this.logout} href="javascript:;">
                <img src={logoutIcon} alt=""/><span>Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

NavMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  toggleSelectedNavItem: PropTypes.func.isRequired,
  selectedNavItem: PropTypes.string.isRequired
};

export default NavMenu;
