import {connect} from 'react-redux';
import Profile from './Profile.jsx';
import {
  getOwnerProfile,
  updateOwnerProfile,
  getStates
} from './profile.actions';
import {
  getCountries
} from '../unit/general/general.actions';

const mapStateToProps = state => ({
  profile: state.userProfile.profile,
  isFetching: state.userProfile.isFetching,
  updating: state.userProfile.updating,
  error: state.userProfile.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerProfile: (params) => dispatch(getOwnerProfile(params)),
    updateOwnerProfile: (params) => dispatch(updateOwnerProfile(params)),
    getStates: () => getStates(),
    getCountries: (continent) => getCountries(continent)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
