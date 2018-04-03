export const INITIATE_GET_TENANT_INFO = 'INITIATE_GET_TENANT_INFO';
export const GET_TENANT_INFO_COMPLETED = 'GET_TENANT_INFO_COMPLETED';
export const GET_TENANT_INFO_FAILED = 'GET_TENANT_INFO_FAILED';
export const TOGGLE_TENANT_STATUS_CLICKED = 'TOGGLE_TENANT_STATUS_CLICKED';
export const SUBMIT_TENANT_BOOKING_REPLY = 'SUBMIT_TENANT_BOOKING_REPLY';
export const TOGGLE_SUBMITTING_TENANT_REPLY = 'TOGGLE_SUBMITTING_TENANT_REPLY';
export const TOGGLE_SUBMITTING_TENANT_REPLY_STATUS = 'TOGGLE_SUBMITTING_TENANT_REPLY_STATUS';

export const initiateGetTenantInfo = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_TENANT_INFO,
      payload: payload,
      isFetching: true,
      tenantStatus: '',
    });
  };
};

export const getTenantInfoCompleted = (data) => {
  return dispatch => {
    dispatch({
      type: GET_TENANT_INFO_COMPLETED,
      details: data,
      isFetching: false,
    });
  };
};

export const getTenantInfoFailed = (error) => {
  return dispatch => {
    dispatch({
      type: GET_TENANT_INFO_FAILED,
      error: error,
      isFetching: false,
    });
  };
};

export const toggleTenantStatusClicked = (status) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_TENANT_STATUS_CLICKED,
      tenantStatus: status,
    });
  };
};

export const submitTenantBookingReply = (payload) => {
  return dispatch => {
    dispatch({
      type: SUBMIT_TENANT_BOOKING_REPLY,
      payload: payload,
      submittingReply: true,
      replyStatus: '',
    });
  };
};

export const toggleTenantSubmittingReply = (status, replyStatus, unitOwnerConfirmation) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SUBMITTING_TENANT_REPLY,
      submittingReply: status,
      replyStatus: replyStatus,
      unitOwnerConfirmation: unitOwnerConfirmation,
    });
  };
};

export const toggleTenantSubmittingReplyStatus = (status) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SUBMITTING_TENANT_REPLY_STATUS,
      replyStatus: status,
    });
  };
};
