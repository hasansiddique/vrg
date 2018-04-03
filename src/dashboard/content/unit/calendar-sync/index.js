import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import CalendarSync from './CalendarSync.jsx';
import {
  getOwnerUnitCalendarSync,
  updateOwnerUnitCalendarSync,
  updateOwnerUnitCalendarSyncStore
} from './calendarsync.actions';

const mapStateToProps = state => ({
  calendarSync: state.ownerUnit.calendarSync.calendarSync,
  isFetching: state.ownerUnit.calendarSync.isFetching,
  updating: state.ownerUnit.calendarSync.updating,
  error: state.ownerUnit.calendarSync.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitCalendarSync: (unitId) => {
      dispatch(updateOwnerUnitCalendarSyncStore({
        isFetching: true,
        error: '',
      }));
      getOwnerUnitCalendarSync(unitId).then((calendarSync) => {
        dispatch(updateOwnerUnitCalendarSyncStore({
          isFetching: false,
          error: '',
          calendarSync: calendarSync
        }));
      }).catch((err) => {
        dispatch(updateOwnerUnitCalendarSyncStore({
          isFetching: false,
          error: 'Unable to fetch guest calendarSync',
        }));
      });
    },
    updateOwnerUnitCalendarSync: (payload) => {
      dispatch(updateOwnerUnitCalendarSyncStore({
        updating: true
      }));
      return updateOwnerUnitCalendarSync(payload).then((res) => {
        dispatch(updateOwnerUnitCalendarSyncStore({
          updating: false
        }));
        return res;
      }).catch((err) => {
        dispatch(updateOwnerUnitCalendarSyncStore({
          updating: false
        }));
        return err;
      });
    },
    updateOwnerUnitCalendarSyncStore: (payload) => dispatch(updateOwnerUnitCalendarSyncStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarSync));
