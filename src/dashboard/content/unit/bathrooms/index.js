import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Bathrooms from './Bathrooms.jsx';
import {
  getOwnerUnitBathrooms,
  updateOwnerUnitBathroomsStore,
  updateOwnerUnitBathrooms,
  deleteOwnerUnitBathrooms
} from './bathrooms.actions';
import {getOwnerUnitBedroom} from '../bedrooms/bedrooms.actions';

const mapStateToProps = state => ({
  bathrooms: state.ownerUnit.bathrooms.bathrooms,
  isFetching: state.ownerUnit.bathrooms.isFetching,
  error: state.ownerUnit.bathrooms.error,
  deleting: state.ownerUnit.bathrooms.deleting
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitBathrooms: (unitId) => {
      dispatch(updateOwnerUnitBathroomsStore({isFetching: true, error: ''}));
      return getOwnerUnitBathrooms(unitId).then((bathrooms) => {
        dispatch(updateOwnerUnitBathroomsStore({bathrooms: bathrooms, isFetching: false, error: ''}));
      }).catch((err) => {
        dispatch(updateOwnerUnitBathroomsStore({isFetching: false, error: err}));
      });
    },
    updateOwnerUnitBathrooms: (params) => updateOwnerUnitBathrooms(params),
    getOwnerUnitBedroom: (unitId, roomId) => getOwnerUnitBedroom(unitId, roomId),
    deleteOwnerUnitBathrooms: (params) => deleteOwnerUnitBathrooms(params),
    updateOwnerUnitBathroomsStore: (payload) => dispatch(updateOwnerUnitBathroomsStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bathrooms));
