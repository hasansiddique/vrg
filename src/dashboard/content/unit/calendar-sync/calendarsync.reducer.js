import {
  UPDATE_OWNER_UNIT_CALENDAR_SYNC
} from './calendarsync.actions';

const initialState = {
  calendarSync: null,
  isFetching: false,
  error: '',
  updating: false
};

const CalendarSync = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_UNIT_CALENDAR_SYNC:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default CalendarSync;