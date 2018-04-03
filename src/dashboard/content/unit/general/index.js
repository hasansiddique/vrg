import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import General from './General.jsx';
import {
  getOwnerUnitGeneral,
  updateOwnerUnitGeneralStore,
  updateOwnerUnitGeneral,
  getCountries,
  getUnitTypes,
  getStates,
  getCities
} from './general.actions';

const mapStateToProps = state => ({
  general: state.ownerUnit.general.general,
  isFetching: state.ownerUnit.general.isFetching,
  error: state.ownerUnit.general.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitGeneral: (unitId) => {
      dispatch(updateOwnerUnitGeneralStore({ isFetching: true, error: '' }));
      return getOwnerUnitGeneral(unitId).then((general) => {
        dispatch(updateOwnerUnitGeneralStore({ general: general, isFetching: false, error: '' }));
      }).catch((err) => {
        dispatch(updateOwnerUnitGeneralStore({ isFetching: false, error: err }));
      });
    },
    updateOwnerUnitGeneralStore: (params) => dispatch(updateOwnerUnitGeneralStore(params)),
    updateOwnerUnitGeneral: (params) => updateOwnerUnitGeneral(params),
    getCountries: (continent) => getCountries(continent),
    getStates: (country) => getStates(country),
    getCities: (country, state) => getCities(country, state),
    getUnitTypes: () => getUnitTypes()
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(General));
