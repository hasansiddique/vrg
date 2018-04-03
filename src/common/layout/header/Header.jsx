import {split, isEmpty, debounce} from 'lodash';
import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import {
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import DropdownMenu from 'common/components/dropdown-menu';

import config from '../../../config';
import SearchDestination from '../../../home/search/destinations';
import MobileMenu from './MobileMenu.jsx';
import UserMenu from './UserMenu.jsx';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      sticky: false
    };

    this.logout = this.logout.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openSignInModal = this.openSignInModal.bind(this);
    this.onScroll = debounce(this.onScroll.bind(this), 0);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    let query = this.getSearchQuery();
    if (query) {
      this.props.updateSearchedLocation({value: 0, label: query});
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  logout() {
    // @todo this will be update with real checks for routes in future
    window.location = '/';
    this.props.logoutUser();
  }

  onScroll() {
    let scrollY = window.scrollY || window.pageYOffset;
    if (scrollY >= 110 && this.state.sticky === false) {
      this.setState({sticky: true});
    } else if (scrollY < 110 && this.state.sticky === true) {
      this.setState({sticky: false});
    }
  }

  onSubmit(label = null) {
    let {searchedLocation, history} = this.props;
    if (!label) {
      label = searchedLocation.label;
    }
    if (label) {
      label = label.toLowerCase();
      let urlParams = queryString.parse(history.location.search);
      urlParams.query = label;
      let basePath = (history.location.pathname.match(/\/map-search/ig)) ? 'map-search' : 'search';
      let search = queryString.stringify(urlParams);
      history.push({
        pathname: '/' + basePath,
        search: search
      });
    }
  }

  getSearchQuery() {
    let queryParams = queryString.parse(this.props.history.location.search);
    return queryParams.query;
  }

  openSignInModal(type) {
    this.props.toggleModalVisibility(true);
    this.props.toggleModalType('register');
    this.props.selectedAuthModalType(type);
  }

  render() {
    const {pathname, isAuthenticated, currentUser, logoutUser} = this.props;
    const showBlock = pathname !== '/';
    const isPropertyPage = (split(pathname, '/', 2)[1] === 'listings');
    let {sticky} = this.state;
    return (
      <section
        id="top-header"
        className={"bottomMenu " + (isPropertyPage ? " is-property-page " : "") + ((showBlock || sticky) ? "dir-il-top-fix" : "hom-top-menu")}>
        <div className="container top-search-main">
          <div className="row">
            <div className="ts-menu">
              <div className="ts-menu-1">
                <Link to={'/'}>
                  <img src={`/images/logo_vrg.png`} alt="VRG"/>
                </Link>
              </div>

              <div className="ts-menu-3">
                <div className="clearfix">
                  <form className="tourz-search-form tourz-top-search-form" onSubmit={() => this.onSubmit()}>
                    <section className="input-field" id="top-search-destination">
                      <SearchDestination handleChange={this.onSubmit} noResultsText={'No properties available.'}/>
                    </section>
                    <section className="input-field" onClick={() => this.onSubmit()}>
                      <i className="waves-effect waves-light tourz-top-sear-btn waves-input-wrapper">
                        <input type="submit" value="" className="waves-button-input"/>
                      </i>
                    </section>
                  </form>
                </div>
              </div>
              <MobileMenu 
                openSignInModal={this.openSignInModal} 
                isAuthenticated={isAuthenticated} 
                logout={this.logout}
                />
              <div className="ts-menu-4">
                <div className="v3-top-ri">
                  <ul id="logged-in-user">
                    <li>
                      <Link to="/advertisement" className="v3-menu-sign">
                        <i className="fa fa-newspaper-o" /> Advertise
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to={(isAuthenticated) ? "/dashboard/units/add" : "/list-your-property"} 
                        className="v3-add-bus list-property">
                        <i className="fa fa-plus" />
                        List Your Property - Free, Free
                      </Link>
                    </li>
                    {isAuthenticated ?
                      <Fragment>
                        <li className="logged-user">
                          <DropdownMenu 
                            title="My Account"
                            icon="caret-down"
                            >
                            <UserMenu logoutUser={logoutUser} />
                          </DropdownMenu>
                        </li>
                      </Fragment>
                      :
                      <li>
                        <Link to="/login" className="v3-menu-sign">
                          <i className="fa fa-sign-in" /> Sign In
                        </Link>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  toggleModalType: PropTypes.func.isRequired,
  selectedAuthModalType: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  toggleModalVisibility: PropTypes.func.isRequired,
  searchedLocation: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  updateSearchedLocation: PropTypes.func.isRequired,
  initiateUserInfo: PropTypes.func.isRequired
};

export default Header;
