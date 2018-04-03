import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// custom imports
import config from '../../config';
import HomeSearch from "../search";

class HomeTopHead extends Component {
  static get propTypes() {
    return {
      showHeader: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
      backgroundImage: PropTypes.string,
      toggleModalVisibility: PropTypes.func,
      toggleModalType: PropTypes.func,
      selectedAuthModalType: PropTypes.func,
      logoutUser: PropTypes.func,
      history: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      showHeader: true
    };
  }

  constructor() {
    super();
    this.logoutUser = this.logoutUser.bind(this);
    this.openSignInModal = this.openSignInModal.bind(this);
  }

  openSignInModal(type) {
    this.props.toggleModalVisibility(true);
    this.props.toggleModalType('register');
    this.props.selectedAuthModalType(type);
  }

  logoutUser(){
    let { logoutUser, history } = this.props;
    history.replace('/');
    logoutUser();
  }

  render() {
    let {showHeader, backgroundImage, isAuthenticated} = this.props;
    let styles = {};
    if (backgroundImage == '') {
      styles = {
        'background': `none`
      };
    }
    else if (backgroundImage) {
      styles = {
        'background': `url(${backgroundImage}) no-repeat`
      };
    }
    return (
      <section className="top-bg-container" style={styles}>
        {(() => {
          if (showHeader) {
            return (
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="dir-ho-tl">
                      <ul>
                        <li>
                          <div className="logo">
                            <Link to="/">
                              <img src={`/images/logo_vrg.png`} alt="VRG" style={{ maxHeight: '60px' }}/>
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="dir-ho-tr">
                      <ul>
                        {(() => {
                          if(isAuthenticated){
                            return (
                              <Fragment>
                                <li><Link to={`/dashboard`}>My Account</Link></li>
                                <li><a onClick={this.logoutUser}>Logout</a></li>   
                                <li>
                                  <Link to="/dashboard/units/add" className="list-property">
                                    <i className="fa fa-plus" /> List Your
                                    Property - Free, Free
                                  </Link>
                                </li>
                              </Fragment>
                            );
                          }else{
                            return (
                              <Fragment>
                                <li><Link to={`/register`}>Register</Link></li>
                                <li><Link to={`/login`}>Sign In</Link></li>   
                                <li>
                                  <Link to="/list-your-property" className="list-property">
                                    <i className="fa fa-plus" /> List Your
                                    Property - Free, Free
                                  </Link>
                                </li>
                              </Fragment>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })()}
        <HomeSearch/>
      </section>
    );
  }
}

export default HomeTopHead;
