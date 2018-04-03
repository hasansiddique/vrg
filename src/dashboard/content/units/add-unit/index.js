import {connect} from 'react-redux';
import AddUnit from './AddUnit.jsx';
import {
  getOwnerUnits,
  updateOwerUnits,
  insertUnit
} from '../units.actions';
import {
  getUnitTypes
} from '../../unit/general/general.actions';

const mapStateToProps = state => ({
  units: state.ownerUnits.units,
  isFetching: state.ownerUnits.isFetching,
  error: state.ownerUnits.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnits: (params) => dispatch(getOwnerUnits(params)),
    getUnitTypes: () => getUnitTypes(),
    insertUnit: (params) => insertUnit(params)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUnit);
