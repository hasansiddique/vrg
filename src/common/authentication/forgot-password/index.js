import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import ForgotPassword from './ForgotPassword.jsx';
import {initiateForgotPasswordRequest, passwordUpdateStatus} from "../authentication.action";

const mapStateToProps = state => ({
  isUpdating: state.auth.isUpdating,
  isAuthenticated: state.auth.isAuthenticated,
  passUpdateMsg: state.auth.passUpdateMsg,
});

const mapDispatchToProps = dispatch => ({
  initiateForgotPasswordRequest: (payload) => dispatch(initiateForgotPasswordRequest(payload)),
  passwordUpdateStatus: (status) => dispatch(passwordUpdateStatus(status)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));
