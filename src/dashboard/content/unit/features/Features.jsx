import React from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import MainFeatures from './main-features';
import LocalFeatures from './local-features';
import CommunityFeatures from './community-features';
import FontIcon from 'common/components/font-icon';

export default class Features extends React.Component {
  static get propTypes(){
    return {
      name: PropTypes.string,
      match: PropTypes.object,
      location: PropTypes.object,
      features: PropTypes.object,
      isFetching: PropTypes.bool,
      error: PropTypes.string,
      getOwnerUnitAllFeatures: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
  }

  routeMatches(url, route, exact = false){
    let matched = matchPath(url, { path: route, exact: exact });
    if(matched){
      if(exact){
        return matched.isExact; 
      }else{
        return true;
      }
    }
    return false;
  }

  render() {
    let { location, match } = this.props;
    let currentUrl = location.pathname;
    let baseUrl = match.url;
    let baseRoutePath = this.props.match.path;
    let featuresRoutePath = baseRoutePath;
    let featuresActive = this.routeMatches(currentUrl, featuresRoutePath, true) ? true : false;
    let localFeaturesRoutePath = baseRoutePath + '/local';
    let localFeaturesActive = this.routeMatches(currentUrl, localFeaturesRoutePath, false) ? true : false;
    let communityFeaturesRoutePath = baseRoutePath + '/community';
    let communityFeaturesActive = this.routeMatches(currentUrl, communityFeaturesRoutePath, false) ? true : false;
    return (
      <div className="unit-features">
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group">
              <li className={`list-group-item ${(featuresActive) ? 'active' : ''}`}>
                <Link to={`${baseUrl}`}>
                  <FontIcon name="angle-right" /> Search Features
                </Link>
              </li>
              <li className={`list-group-item ${(localFeaturesActive) ? 'active' : ''}`}>
                <NavLink to={`${baseUrl}/local`} activeClassName="active">
                  <FontIcon name="angle-right" /> Unit Features
                </NavLink>
                <ul className="sub-list">
                  <li>
                    <NavLink to={`${baseUrl}/local`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Amenities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${baseUrl}/local/entertainment`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Entertainment
                    </NavLink>
                    <NavLink to={`${baseUrl}/local/general`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> General
                    </NavLink>
                    <NavLink to={`${baseUrl}/local/kitchen-and-dining`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Kitchen & Dining
                    </NavLink>
                    <NavLink to={`${baseUrl}/local/outdoor`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Outdoor
                    </NavLink>
                    <NavLink to={`${baseUrl}/local/pool-spa`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Pool SPA
                    </NavLink>
                    <NavLink to={`${baseUrl}/local/suitability`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Suitability
                    </NavLink>
                    <NavLink to={`${baseUrl}/local/themes`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Themes
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={`list-group-item ${(communityFeaturesActive) ? 'active' : ''}`}>
                <NavLink to={`${baseUrl}/community`} activeClassName="active">
                  <FontIcon name="angle-right" /> Community Features
                </NavLink>
                <ul className="sub-list">
                  <li>
                    <NavLink to={`${baseUrl}/community`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Attractions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${baseUrl}/community/car`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Car
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${baseUrl}/community/leisure`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Leisure
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${baseUrl}/community/local`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Local
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${baseUrl}/community/location-types`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Location Types
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${baseUrl}/community/sports-and-adventure`} exact activeClassName="active">
                      <FontIcon name="angle-right" /> Sports And Adventure
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-sm-9">
            <div className="content">
              <Route path={`${baseRoutePath}`} exact component={MainFeatures} />
              <Route path={`${baseRoutePath}/local`} component={LocalFeatures} />
              <Route path={`${baseRoutePath}/community`} component={CommunityFeatures} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
