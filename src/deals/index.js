import {connect} from 'react-redux';

import {
  getDeals
} from './deals.action';
import Deals from './Deals.jsx';

const mapStateToProps = state => ({
  deals: state.deals.deals,
  isFetching: state.deals.isFetching,
  error: state.deals.error
});

const mapDispatchToProps = dispatch => ({
  getDeals: (params) => dispatch(getDeals(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Deals);
