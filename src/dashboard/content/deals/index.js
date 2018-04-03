import {connect} from 'react-redux';
import Deals from './Deals.jsx';
import {
  getOwnerDeals,
  refreshOwnerDeal,
  deleteOwnerDeal,
  updateOwnerDeals
} from './deals.actions';

const mapStateToProps = state => ({
  deals: state.advertiserDashboard.deals.deals,
  isFetching: state.advertiserDashboard.deals.isFetching,
  error: state.advertiserDashboard.deals.error,
  count: state.advertiserDashboard.deals.count,
  type: state.advertiserDashboard.deals.type
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerDeals: (params) => dispatch(getOwnerDeals(params)),
    refreshOwnerDeal: (deal) => dispatch(refreshOwnerDeal(deal)),
    deleteOwnerDeal: (deal) => dispatch(deleteOwnerDeal(deal)),
    updateOwnerDeals: (deals) => dispatch(updateOwnerDeals(deals))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deals);
