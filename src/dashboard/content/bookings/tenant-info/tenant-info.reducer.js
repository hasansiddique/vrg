import {set} from 'lodash';
import {
  INITIATE_GET_TENANT_INFO,
  GET_TENANT_INFO_COMPLETED,
  GET_TENANT_INFO_FAILED,
  TOGGLE_TENANT_STATUS_CLICKED,
  SUBMIT_TENANT_BOOKING_REPLY,
  TOGGLE_SUBMITTING_TENANT_REPLY,
  TOGGLE_SUBMITTING_TENANT_REPLY_STATUS,
} from './tenant-info.action';

const initialState = {
  isFetching: false,
  details: {},
  error: {},
  bookingId: 0,
  tenantStatus: '',
  submittingReply: false,
  replyStatus: '',
};

const rentalInfo = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_TENANT_INFO:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        error: {},
      });

    case GET_TENANT_INFO_COMPLETED:
      return Object.assign({}, state, {
        details: action.details,
        isFetching: action.isFetching,
      });

    case GET_TENANT_INFO_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: action.isFetching,
      });

    case TOGGLE_TENANT_STATUS_CLICKED:
      return Object.assign({}, state, {
        tenantStatus: action.tenantStatus,
      });

    case SUBMIT_TENANT_BOOKING_REPLY:
      return Object.assign({}, state, {
        submittingReply: action.submittingReply,
        replyStatus: action.replyStatus,
      });

    case TOGGLE_SUBMITTING_TENANT_REPLY_STATUS:
      return Object.assign({}, state, {
        replyStatus: action.replyStatus,
      });

    case TOGGLE_SUBMITTING_TENANT_REPLY:
      return Object.assign({}, state, {
        submittingReply: action.submittingReply,
        replyStatus: action.replyStatus,
        details: set(state.details, 'unitOwnerConfirmation', action.unitOwnerConfirmation)
      });

    default:
      return state;
  }
};

export default rentalInfo;
