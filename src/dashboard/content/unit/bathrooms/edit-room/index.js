import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Editroom from './Editroom.jsx';
import {
  getOwnerUnitBathrooms,
  getOwnerUnitBathroom,
  updateOwnerUnitBathroomsStore,
  updateOwnerUnitBathrooms,
  addOwnerUnitBathrooms
} from '../bathrooms.actions';

const mapStateToProps = state => ({
  bathrooms: state.ownerUnit.bathrooms.bathrooms,
  isFetching: state.ownerUnit.bathrooms.isFetching,
  error: state.ownerUnit.bathrooms.error,
  updating: state.ownerUnit.bathrooms.updating
});
const mapDispatchToProps = (dispatch) => {
  return {
    updateOwnerUnitBathrooms: (params) => updateOwnerUnitBathrooms(params),
    getOwnerUnitBathroom: (unitId, roomId) => getOwnerUnitBathroom(unitId, roomId),
    addOwnerUnitBathrooms: (params) => addOwnerUnitBathrooms(params),
    updateOwnerUnitBathroomsStore: (payload) => dispatch(updateOwnerUnitBathroomsStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editroom));
