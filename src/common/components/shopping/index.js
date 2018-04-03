import {get} from 'lodash';
import {connect} from 'react-redux';

import AdShopping from './AdShopping.jsx';
import {initiateGetHomeShopping, getShopping} from './shopping.action';
import {
  countAdClick
} from 'common/ads.action';

const mapStateToProps = state => ({
  shoppingList: state.home.shopping.shoppingList,
  count: state.home.shopping.count,
  isFetching: state.home.shopping.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetHomeShopping: (payload) => dispatch(initiateGetHomeShopping(payload)),
  getShopping: (payload) => dispatch(getShopping(payload)),
  countAdClick: (adId) => countAdClick(adId)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdShopping);
