import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import MainFeatures from './MainFeatures.jsx';
import {
  getOwnerUnitMainFeatures,
  updateOwnerUnitMainFeatures,
  updateOwnerUnitMainFeaturesStore
} from './main-features.actions';

const mapStateToProps = state => ({
  features: state.ownerUnit.features.main.features,
  isFetching: state.ownerUnit.features.main.isFetching,
  isUpdating: state.ownerUnit.features.main.isUpdating,
  error: state.ownerUnit.features.main.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitMainFeatures: (unitId) => dispatch(getOwnerUnitMainFeatures(unitId)),
    updateOwnerUnitMainFeatures: (params) => dispatch(updateOwnerUnitMainFeatures(params)),
    updateOwnerUnitMainFeaturesStore: (params) => dispatch(updateOwnerUnitMainFeaturesStore(params))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainFeatures));
