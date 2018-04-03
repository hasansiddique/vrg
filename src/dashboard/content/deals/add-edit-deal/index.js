import {connect} from 'react-redux';
import AddDeal from './AddDeal.jsx';
import {
  addOwnerDeal,
  updateOwnerDeals,
  getUnits,
  getUnitPrice,
  getDealCategories,
  getOwnerDeal,
  updateOwnerDeal
} from '../deals.actions';

const mapStateToProps = state => ({
  deals: state.advertiserDashboard.deals.deals,
  adding: state.advertiserDashboard.deals.adding,
  updating: state.advertiserDashboard.deals.updating,
  type: state.advertiserDashboard.deals.type,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addOwnerDeal: (params) => dispatch(addOwnerDeal(params)),
    updateOwnerDeals: (params) => dispatch(updateOwnerDeals(params)),
    getUnits: (params) => dispatch(getUnits(params)),
    getUnitPrice: (params) => dispatch(getUnitPrice(params)),
    getDealCategories: (params) => dispatch(getDealCategories(params)),
    getOwnerDeal: (params) => dispatch(getOwnerDeal(params)),
    updateOwnerDeal: (params) => dispatch(updateOwnerDeal(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDeal);
