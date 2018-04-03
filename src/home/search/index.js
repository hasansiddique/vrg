import {connect} from 'react-redux';
import {withRouter} from "react-router";

import HomeSearch from './HomeSearch.jsx';
import {
  fetchLocationsList,
  updateCheckInDate,
  updateCheckOutDate,
  initiateSearchForLocations
} from './search.action';

const mapStateToProps = state => ({
  checkInDate: state.home.search.checkInDate,
  checkOutDate: state.home.search.checkOutDate,
  searchedLocation: state.home.search.searchedLocation,
  isMobile: state.ui.isMobile
});

const mapDispatchToProps = dispatch => ({
  fetchLocationsList: () => dispatch(fetchLocationsList()),
  updateCheckInDate: (date) => dispatch(updateCheckInDate(date)),
  updateCheckOutDate: (date) => dispatch(updateCheckOutDate(date)),
  initiateSearchForLocations: (payload) => dispatch(initiateSearchForLocations(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeSearch));
