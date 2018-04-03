import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Authentication from './Authentication.jsx';
import {initiateLoginInfo, resetRegisterPayload} from "./authentication.action";

const mapStateToProps = state => ({
  isCreating: state.auth.isCreating,
  registerPayload: state.auth.registerPayload,
  isAuthenticated: state.auth.isAuthenticated,
  selectedAuthModal: state.auth.selectedAuthModal,
});

const mapDispatchToProps = dispatch => ({
  initiateLoginInfo: (payload) => dispatch(initiateLoginInfo(payload)),
  resetRegisterPayload: () => dispatch(resetRegisterPayload()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication));
