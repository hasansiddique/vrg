import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Login from './Login.jsx';
import {initiateLoginInfo, loginInfoFailed} from "../authentication.action";

const mapStateToProps = state => ({
  isLogging: state.auth.isLogging,
  isAuthenticated: state.auth.isAuthenticated,
  errorLogin: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  initiateLoginInfo: (payload) => dispatch(initiateLoginInfo(payload)),
  loginInfoFailed: (error) => dispatch(loginInfoFailed(error)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
