import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Header from './Header.jsx';

import {
  toggleModalType,
  toggleModalVisibility
} from '../../components/modal/modal.actions';

import {
  updateLocationsList
} from '../../../home/search/destinations/destinations.action';

import {
  initiateUserInfo,
  logoutUser,
  selectedAuthModalType
} from '../../authentication/authentication.action';

const mapStateToProps = state => ({
  modalIsOpen: state.modal.modalIsOpen,
  modalType: state.modal.modalType,
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user,
  searchedLocation: state.home.search.searchedLocation
});

const mapDispatchToProps = dispatch => ({
  updateSearchedLocation: (payload) => dispatch(updateLocationsList(payload)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  selectedAuthModalType: (type) => dispatch(selectedAuthModalType(type)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
  initiateUserInfo: () => dispatch(initiateUserInfo()),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
