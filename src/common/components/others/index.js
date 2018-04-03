import {get} from 'lodash';
import {connect} from 'react-redux';

import AdOthers from './AdOthers.jsx';
import {
  initiateGetHomeOthers, 
  getOthers
} from './others.action';
import {
  countAdClick
} from 'common/ads.action';

const mapStateToProps = state => ({
  others: state.home.others.othersList,
  count: state.home.others.count,
  isFetching: state.home.others.isFetching
});

const mapDispatchToProps = dispatch => ({
  initiateGetHomeOthers: (payload) => dispatch(initiateGetHomeOthers(payload)),
  getOthers: (payload) => dispatch(getOthers(payload)),
  countAdClick: (adId) => countAdClick(adId)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdOthers);
