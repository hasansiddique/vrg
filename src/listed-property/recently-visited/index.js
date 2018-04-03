import {connect} from 'react-redux';

import RecentlyVisited from './RecentlyVisited.jsx';
import {initiateGetRecentUnits} from "./recently-visited.action";

const mapStateToProps = state => ({
  recentUnits: state.listedProperty.recentUnits.units,
  isFetching: state.listedProperty.propertyGallery.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetRecentUnits: (payload) => dispatch(initiateGetRecentUnits(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RecentlyVisited);
