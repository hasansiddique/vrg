import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import General from './general';
import Bedrooms from './bedrooms';
import Bathrooms from './bathrooms';
import GuestInfo from './guest-info';
import Features from './features';
import Images from './images';
import BaseRate from './base-rate';
import CalendarSync from './calendar-sync';

class Unit extends Component {
  render() {
    let { match } = this.props;
    let baseUrlTemplate = '/dashboard/units/:id';
    let baseUrl = '/dashboard/units/' + match.params.id;
    return (
      <div>
        <h4><span>Edit Unit</span></h4>
        <div className="tz-2-main-com unit-edit">
          <div className="my-tabs">
            <ul className="nav nav-tabs">
              <li><NavLink to={`${baseUrl}`} exact activeClassName="active">General</NavLink></li>
              <li><NavLink to={`${baseUrl}/bedrooms`} activeClassName="active">Bedrooms</NavLink></li>
              <li><NavLink to={`${baseUrl}/bathrooms`} activeClassName="active">Bathrooms</NavLink></li>
              <li><NavLink to={`${baseUrl}/guest-info`} activeClassName="active">Guest Info</NavLink></li>
              <li><NavLink to={`${baseUrl}/features`} activeClassName="active">Features</NavLink></li>
              <li><NavLink to={`${baseUrl}/base-rate`} activeClassName="active">Base Rate</NavLink></li>
              <li><NavLink to={`${baseUrl}/calendar-sync`} activeClassName="active">Calendar Sync</NavLink></li>
              <li><NavLink to={`${baseUrl}/images`} activeClassName="active">Images</NavLink></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active">
                <div className="db-list-com tz-db-table">
                  <Route path={`${baseUrlTemplate}`} exact component={General} />
                  <Route path={`${baseUrlTemplate}/bedrooms`} component={Bedrooms} />
                  <Route path={`${baseUrlTemplate}/bathrooms`} component={Bathrooms} />
                  <Route path={`${baseUrlTemplate}/guest-info`} component={GuestInfo} />
                  <Route path={`${baseUrlTemplate}/features`} component={Features} />
                  <Route path={`${baseUrlTemplate}/base-rate`} component={BaseRate} />
                  <Route path={`${baseUrlTemplate}/calendar-sync`} component={CalendarSync} />
                  <Route path={`${baseUrlTemplate}/images`} component={Images} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Unit.propTypes = {
  match: PropTypes.object
};

export default Unit;
