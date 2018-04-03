import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import storage from './storage';
import Modal from './components/modal';
import Header from './layout/header';
import Footer from './layout/footer';
import TopSpinner from './components/top-spinner';
import AppRoutes from '../../src/routes';
import {initiateUserInfo, loginInfoFailed} from './authentication/authentication.action';

import {
  fetchLocationsList
} from '../home/search/search.action';
import {
  setIsMobile
} from './ui.actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let storageUser = storage.get('user');
    if (storageUser) {
      this.props.initiateUserInfo();
    } else {
      this.props.loginInfoFailed('');
    }
  }

  componentDidMount() {
    const self = this;
    this.props.fetchLocationsList();

    let isMobile = true;
    if (window.matchMedia("(min-width: 769px)").matches) {
      isMobile = false;
    }
    self.props.setIsMobile(isMobile);
    
    window.addEventListener('resize', function (event) {
      let isMobile = true;
      if (window.matchMedia("(min-width: 769px)").matches) {
        isMobile = false;
      }
      self.props.setIsMobile(isMobile);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {location} = this.props;
    return (
      <div>
        <Modal/>
        <TopSpinner/>
        <Header pathname={location.pathname}/>
        <AppRoutes/>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  initiateUserInfo: PropTypes.func.isRequired,
  setIsMobile: PropTypes.func,
  fetchLocationsList: PropTypes.func,
  loginInfoFailed: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  initiateUserInfo: () => dispatch(initiateUserInfo()),
  loginInfoFailed: (err) => dispatch(loginInfoFailed(err)),
  fetchLocationsList: () => dispatch(fetchLocationsList()),
  setIsMobile: (state) => dispatch(setIsMobile(state))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
