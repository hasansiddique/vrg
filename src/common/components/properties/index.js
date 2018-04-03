import {get} from 'lodash';
import {connect} from 'react-redux';

import FeaturedProperties from './FeaturedProperties.jsx';
import {initiateGetHomeProperties} from './properties.action';
import {
  countAdClick
} from 'common/ads.action';

const mapStateToProps = state => ({
  properties: get(state, 'home.properties.propertiesList.data') || [],
  adcount: get(state, 'home.properties.propertiesList.adcount') || 0,
  isFetching: state.home.properties.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetProperties: (payload) => dispatch(initiateGetHomeProperties(payload)),
  countAdClick: (adId) => countAdClick(adId)
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProperties);
