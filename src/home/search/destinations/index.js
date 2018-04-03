import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import SearchDestination from './SearchDestination.jsx';

import {updateLocationsList} from './destinations.action';
import {initiateGetDestination} from "../../../destination/destination.action";

const mapStateToProps = state => ({
  locationsList: state.home.search.locationsList,
  searchedLocation: state.home.search.searchedLocation,
});

const mapDispatchToProps = dispatch => ({
  updateLocationsList: (location) => dispatch(updateLocationsList(location)),
  initiateGetDestination: (path) => dispatch(initiateGetDestination(path)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDestination));
