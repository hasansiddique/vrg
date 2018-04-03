import {connect} from 'react-redux';

import UserProfile from './UserProfile.jsx';
import {
  getUserProfileCounters
} from './userprofile.actions';

const mapStateToProps = state => ({
  counters: state.advertiserDashboard.userProfile.counters,
  isFetching: state.advertiserDashboard.userProfile.isFetching,
  error: state.advertiserDashboard.userProfile.error,
  currentUser: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfileCounters: () => dispatch(getUserProfileCounters())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
