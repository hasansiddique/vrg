import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import HomeTopHead from './HomeTopHead.jsx';

import {
  toggleModalType,
  toggleModalVisibility
} from '../../common/components/modal/modal.actions';

import {selectedAuthModalType, logoutUser} from '../../common/authentication/authentication.action';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
  selectedAuthModalType: (type) => dispatch(selectedAuthModalType(type)),
  logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeTopHead));
