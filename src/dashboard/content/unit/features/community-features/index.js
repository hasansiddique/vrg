import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import CommunityFeatures from './CommunityFeatures.jsx';
import {
  getOwnerUnitCommunityFeatures,
  updateOwnerUnitCommunityFeatures,
  updateOwnerUnitCommunityFeaturesStore  
} from './community-features.actions';

const mapStateToProps = state => ({
  features: state.ownerUnit.features.community.features,
  isFetching: state.ownerUnit.features.community.isFetching,
  isUpdating: state.ownerUnit.features.community.isUpdating,
  error: state.ownerUnit.features.community.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitCommunityFeatures: (unitId) => dispatch(getOwnerUnitCommunityFeatures(unitId)),
    updateOwnerUnitCommunityFeatures: (params) => dispatch(updateOwnerUnitCommunityFeatures(params)),
    updateOwnerUnitCommunityFeaturesStore: (values) => dispatch(updateOwnerUnitCommunityFeaturesStore(values))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommunityFeatures));
