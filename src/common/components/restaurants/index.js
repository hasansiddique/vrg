import {get} from 'lodash';
import {connect} from 'react-redux';

import AdRestaurants from './AdRestaurant.jsx';
import {
  initiateGetHomeRestaurants, 
  getResturants
} from './restaurant.action';
import {
  countAdClick
} from 'common/ads.action';

const mapStateToProps = state => ({
  restaurants: get(state, 'home.restaurants.restaurantList') || [],
  count: get(state, 'home.restaurants.count') || 0,
  isFetching: state.home.restaurants.isFetching
});

const mapDispatchToProps = dispatch => ({
  initiateGetHomeRestaurants: (payload) => dispatch(initiateGetHomeRestaurants(payload)),
  getResturants: (payload) => dispatch(getResturants(payload)),
  countAdClick: (adId) => countAdClick(adId)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdRestaurants);
