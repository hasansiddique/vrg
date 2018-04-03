import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import GuestInfo from './GuestInfo.jsx';
import {
  getOwnerUnitGuestInfo,
  updateOwnerUnitGuestInfo,
  updateOwnerUnitGuestInfoStore
} from './guestinfo.actions';

const mapStateToProps = state => ({
  guestInfo: state.ownerUnit.guestInfo.guestInfo,
  isFetching: state.ownerUnit.guestInfo.isFetching,
  updating: state.ownerUnit.guestInfo.updating,
  error: state.ownerUnit.guestInfo.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitGuestInfo: (unitId) => {
      dispatch(updateOwnerUnitGuestInfoStore({
        isFetching: true,
        error: '',
      }));
      getOwnerUnitGuestInfo(unitId).then((info) => {
        dispatch(updateOwnerUnitGuestInfoStore({
          isFetching: false,
          error: '',
          guestInfo: info
        }));
      }).catch((err) => {
        dispatch(updateOwnerUnitGuestInfoStore({
          isFetching: false,
          error: 'Unable to fetch guest info',
        }));
      });
    },
    updateOwnerUnitGuestInfo: (payload) => {
      dispatch(updateOwnerUnitGuestInfoStore({
        updating: true
      }));
      updateOwnerUnitGuestInfo(payload).then(() => {
        dispatch(updateOwnerUnitGuestInfoStore({
          updating: false
        }));
      }).catch((err) => {
        dispatch(updateOwnerUnitGuestInfoStore({
          updating: false
        }));
      });
    },
    updateOwnerUnitGuestInfoStore: (payload) => dispatch(updateOwnerUnitGuestInfoStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GuestInfo));
