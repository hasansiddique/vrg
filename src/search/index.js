import {connect} from 'react-redux';

import { initiateGetSearchListings, getSearchListingsCompleted } from './search.action';
import {
  initiateGetDestination,
  resetDestination,
} from '../destination/destination.action';
import {
  setFooterVisibility
} from '../common/ui.actions';
import Search from './Search.jsx';

const mapStateToProps = state => ({
  listings: state.search.listings,
  isFetching: state.search.isFetching,
  error: state.search.error,
  count: state.search.count,
  destination: state.destination,
  searchedLocation: state.home.search.searchedLocation,
  isMobile: state.ui.isMobile
});

const mapDispatchToProps = dispatch => ({
  initiateGetSearchListings: (params, reset) => dispatch(initiateGetSearchListings(params, reset)),
  initiateGetDestination: (path, type = null) => {
    dispatch(getSearchListingsCompleted([], 0));
    return dispatch(initiateGetDestination(path, false, type));
  },
  resetDestination: () => {
    dispatch(getSearchListingsCompleted([], 0));
    return dispatch(resetDestination());
  },
  setFooterVisibility: (state) => dispatch(setFooterVisibility(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);