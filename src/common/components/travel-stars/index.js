import {connect} from 'react-redux';

import AdTravelStars from './AdTravelStars.jsx';
import {initiateGetHomeTravelStars} from './travel-stars.action';

const mapStateToProps = state => ({
  travelStarsList: state.home.travelStars.travelStarsList,
  destination: state.destination,
  error: state.home.travelStars.error,
  isFetching: state.home.travelStars.isFetching
});

const mapDispatchToProps = dispatch => ({
  initiateGetHomeTravelStars: (params) => dispatch(initiateGetHomeTravelStars(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdTravelStars);
