import {connect} from 'react-redux';

import AdTransportation from './AdTransportation.jsx';
import {initiateGetHomeTransportation, getTransportation} from './transportation.action';
import {
  countAdClick
} from 'common/ads.action';

const mapStateToProps = state => ({
  transportationList: state.home.transportation.transportationList,
  count: state.home.transportation.count,
  isFetching: state.home.transportation.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetHomeTransportation: (payload) => dispatch(initiateGetHomeTransportation(payload)),
  getTransportation: (payload) => dispatch(getTransportation(payload)),
  countAdClick: (adId) => countAdClick(adId)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdTransportation);
