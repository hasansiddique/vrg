import {connect} from 'react-redux';

import {
  initiateGetDestination,
  initiateGetDestinationProperties,
  resetDestination,
  resetDestinationDrilldown,
  resetDestinationProperties
} from './destination.action';
import {
  initiateGetHomeTravelStars
} from '../common/components/travel-stars/travel-stars.action';
import Destination from './Destination.jsx';

const mapStateToProps = state => ({
  destination: state.destination,
  destinationProperties: state.destinationProperties,
  travelStarsList: state.home.travelStars.travelStarsList,
  travelStarsFetching: state.home.travelStars.isFetching,
  destinationDrilldown: state.destinationDrilldown
});

const mapDispatchToProps = dispatch => ({
  initiateGetDestination: (path, reset = false, searchType = null) => dispatch(initiateGetDestination(path, reset, searchType)),
  initiateGetDestinationProperties: (params) => dispatch(initiateGetDestinationProperties(params)),
  initiateGetHomeTravelStars: (params) => dispatch(initiateGetHomeTravelStars(params)),
  resetDestination: () => dispatch(resetDestination()),
  resetDestinationDrilldown: () => dispatch(resetDestinationDrilldown()),
  resetDestinationProperties: () => dispatch(resetDestinationProperties())
});

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
