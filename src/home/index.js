import {connect} from 'react-redux';
import {
  initiateGetDestination
} from '../destination/destination.action';

import Home from './Home.jsx';

const mapStateToProps = state => ({
  destinationDrilldown: state.destinationDrilldown
});

const mapDispatchToProps = dispatch => ({
  initiateGetDestination: (path) => dispatch(initiateGetDestination(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
