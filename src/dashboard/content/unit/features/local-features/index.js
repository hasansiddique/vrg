import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import LocalFeatures from './LocalFeatures.jsx';
import {
  getOwnerUnitLocalFeatures,
  updateOwnerUnitLocalFeatures,
  updateOwnerUnitLocalFeaturesStore  
} from './local-features.actions';

const mapStateToProps = state => ({
  features: state.ownerUnit.features.local.features,
  isFetching: state.ownerUnit.features.local.isFetching,
  isUpdating: state.ownerUnit.features.local.isUpdating,
  error: state.ownerUnit.features.local.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitLocalFeatures: (unitId) => dispatch(getOwnerUnitLocalFeatures(unitId)),
    updateOwnerUnitLocalFeatures: (params) => dispatch(updateOwnerUnitLocalFeatures(params)),
    updateOwnerUnitLocalFeaturesStore: (params) => dispatch(updateOwnerUnitLocalFeaturesStore(params))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocalFeatures));
