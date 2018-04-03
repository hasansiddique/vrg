import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Register from './Register.jsx';
import {
  initiateUserCreation,
  registerOwner
} from "../authentication.action";
import {getCities, getCountries, getStates} from "../../../dashboard/content/unit/general/general.actions";

const mapStateToProps = state => ({
  isCreating: state.auth.isCreating,
  registerError: state.auth.registerError,
  ownerCreated: state.auth.ownerCreated
});

const mapDispatchToProps = dispatch => ({
  initiateUserCreation: (payload) => dispatch(initiateUserCreation(payload)),
  registerOwner: (payload) => dispatch(registerOwner(payload)),
  getCountries: (continent) => getCountries(continent),
  getStates: (country) => getStates(country),
  getCities: (country, state) => getCities(country, state),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
