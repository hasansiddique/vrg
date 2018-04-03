import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Editroom from './Editroom.jsx';
import {
  getOwnerUnitBedrooms,
  getOwnerUnitBedroom,
  updateOwnerUnitBedroomsStore,
  updateOwnerUnitBedrooms,
  addOwnerUnitBedrooms
} from '../bedrooms.actions';

const mapStateToProps = state => ({
  bedrooms: state.ownerUnit.bedrooms.bedrooms,
  isFetching: state.ownerUnit.bedrooms.isFetching,
  error: state.ownerUnit.bedrooms.error,
  updating: state.ownerUnit.bedrooms.updating
});
const mapDispatchToProps = (dispatch) => {
  return {
    updateOwnerUnitBedrooms: (params) => updateOwnerUnitBedrooms(params),
    getOwnerUnitBedroom: (unitId, roomId) => getOwnerUnitBedroom(unitId, roomId),
    addOwnerUnitBedrooms: (params) => addOwnerUnitBedrooms(params),
    updateOwnerUnitBedroomsStore: (payload) => dispatch(updateOwnerUnitBedroomsStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editroom));
