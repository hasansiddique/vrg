import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import BaseRate from './BaseRate.jsx';
import {
  getOwnerUnitBaseRate,
  updateOwnerUnitBaseRate,
  updateOwnerUnitBaseRateStore
} from './baserate.actions';

const mapStateToProps = state => ({
  baseRate: state.ownerUnit.baseRate.baseRate,
  isFetching: state.ownerUnit.baseRate.isFetching,
  updating: state.ownerUnit.baseRate.updating,
  error: state.ownerUnit.baseRate.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitBaseRate: (unitId) => {
      dispatch(updateOwnerUnitBaseRateStore({
        isFetching: true,
        error: '',
      }));
      getOwnerUnitBaseRate(unitId).then((baseRate) => {
        dispatch(updateOwnerUnitBaseRateStore({
          isFetching: false,
          error: '',
          baseRate: baseRate
        }));
      }).catch((err) => {
        dispatch(updateOwnerUnitBaseRateStore({
          isFetching: false,
          error: 'Unable to fetch guest baseRate',
        }));
      });
    },
    updateOwnerUnitBaseRate: (payload) => {
      dispatch(updateOwnerUnitBaseRateStore({
        updating: true
      }));
      updateOwnerUnitBaseRate(payload).then(() => {
        dispatch(updateOwnerUnitBaseRateStore({
          updating: false
        }));
      }).catch((err) => {
        dispatch(updateOwnerUnitBaseRateStore({
          updating: false
        }));
      });
    },
    updateOwnerUnitBaseRateStore: (payload) => dispatch(updateOwnerUnitBaseRateStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseRate));
