import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Bedrooms from './Bedrooms.jsx';
import {
  getOwnerUnitBedrooms,
  getOwnerUnitBedroom,
  updateOwnerUnitBedroomsStore,
  updateOwnerUnitBedrooms,
  deleteOwnerUnitBedrooms
} from './bedrooms.actions';

const mapStateToProps = state => ({
  bedrooms: state.ownerUnit.bedrooms.bedrooms,
  isFetching: state.ownerUnit.bedrooms.isFetching,
  error: state.ownerUnit.bedrooms.error,
  deleting: state.ownerUnit.bedrooms.deleting
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitBedrooms: (unitId) => {
      dispatch(updateOwnerUnitBedroomsStore({ isFetching: true, error: '' }));
      return getOwnerUnitBedrooms(unitId).then((bedrooms) => {
        dispatch(updateOwnerUnitBedroomsStore({ bedrooms: bedrooms, isFetching: false, error: '' }));
      }).catch((err) => {
        dispatch(updateOwnerUnitBedroomsStore({ isFetching: false, error: err }));
      });
    },
    updateOwnerUnitBedrooms: (params) => updateOwnerUnitBedrooms(params),
    getOwnerUnitBedroom: (unitId, roomId) => getOwnerUnitBedroom(unitId, roomId),
    deleteOwnerUnitBedrooms: (params) => deleteOwnerUnitBedrooms(params),
    updateOwnerUnitBedroomsStore: (payload) => dispatch(updateOwnerUnitBedroomsStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bedrooms));
