import {connect} from 'react-redux';
import Units from './Units.jsx';
import {
  getOwnerUnits,
  updateOwerUnits
} from './units.actions';

const mapStateToProps = state => ({
  units: state.ownerUnits.units,
  isFetching: state.ownerUnits.isFetching,
  error: state.ownerUnits.error,
  count: state.ownerUnits.count
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnits: (params) => dispatch(getOwnerUnits(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Units);
