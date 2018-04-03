import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MobileMenu extends React.Component {

  static get propTypes(){
    return {
      openSignInModal: PropTypes.func,
      logout: PropTypes.func,
      isAuthenticated: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.logout = this.logout.bind(this);
    this.openSignInModal = this.openSignInModal.bind(this);
  }

  closeMenu() {
    this.setState({mobileMenuOpen: false});
  }

  openMenu(){
    this.setState({ mobileMenuOpen: true });
  }

  openSignInModal(){
    let { openSignInModal } = this.props;
    openSignInModal('login');
    this.closeMenu();
  }

  logout(){
    let { logout } = this.props;
    logout();
    this.closeMenu();
  }

  render() {
    let { mobileMenuOpen } = this.state;
    let { isAuthenticated } = this.props;
    return (
      <Fragment>
        <div className="ts-menu-5" onClick={this.openMenu}>
          <span>
            <i className="fa fa-bars"/>
          </span>
        </div>
        {(mobileMenuOpen) ? (<div className="menu-overlay" onClick={this.closeMenu} />) : ''}
        <div className={`mob-right-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="menu-content">
            <div className="mob-right-nav-close" onClick={this.closeMenu}>
              <i className="fa fa-times" />
            </div>
            <ul className="mob-menu-icon">
              {(() => {
                if(!isAuthenticated){
                  return (
                    <Fragment>
                      <li>
                        <Link
                          onClick={this.closeMenu} 
                          to="/advertisement" >
                          Advertise
                        </Link>
                      </li>
                      <li>
                        <NavLink 
                          onClick={this.closeMenu} to={(isAuthenticated) ? "/dashboard/units/add" : "/list-your-property"}
                          >Add Listing
                        </NavLink>
                      </li>
                      <li><Link to="/register" onClick={this.closeMenu}>Register</Link></li>
                      <li><Link to="/login" onClick={this.closeMenu}>Sign In</Link></li>   
                    </Fragment>
                  );
                }else{
                  return (
                    <Fragment>
                      <li>
                        <NavLink 
                          onClick={this.closeMenu}
                          exact
                          to={`/dashboard`}
                          activeClassName="active"
                          >
                          My Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink 
                          onClick={this.closeMenu}
                          to="/dashboard/bookings"
                          activeClassName="active">
                          Bookings
                        </NavLink>
                      </li>
                      <li>
                        <NavLink 
                          onClick={this.closeMenu}
                          to="/dashboard/units"
                          activeClassName="active">
                          Residential Units
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={this.closeMenu} to="/dashboard/rates-availability" activeClassName="active">
                          Rates & Availability
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={this.closeMenu} to={`/dashboard/tenants`} activeClassName="active">
                          Tenants List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={this.closeMenu} 
                          activeClassName="active"
                          to={`/dashboard/deals`}>
                          Vacation Rental Deals
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={this.closeMenu} to={`/dashboard/advertisement`} activeClassName="active">
                          Advertisement
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={this.closeMenu} to={`/dashboard/profile`} activeClassName="active">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <a onClick={this.logout} href="javascript:;">
                          Log Out
                        </a>
                      </li>
                    </Fragment>
                  );
                }
              })()}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
