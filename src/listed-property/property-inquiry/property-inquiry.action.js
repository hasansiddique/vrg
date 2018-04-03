import { postUsingAjax } from 'common/api';

export const INITIATE_GET_PROPERTY_INQUIRY_REQUEST = 'INITIATE_GET_PROPERTY_INQUIRY_REQUEST';
export const GET_PROPERTY_INQUIRY_COMPLETED = 'GET_PROPERTY_INQUIRY_COMPLETED';
export const GET_PROPERTY_INQUIRY_FAILED = 'GET_PROPERTY_INQUIRY_FAILED';
export const GET_PROPERTY_INQUIRY_ERROR = 'GET_PROPERTY_INQUIRY_ERROR';

export const initiateGetPropertyInquiry = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_PROPERTY_INQUIRY_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getPropertyInquiryCompleted = (inquiry) => {
  return dispatch => {
    dispatch({
      type: GET_PROPERTY_INQUIRY_COMPLETED,
      inquiry: inquiry,
      isFetching: false
    });
  };
};

export const getPropertyInquiryFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_PROPERTY_INQUIRY_FAILED,
      isFetching: false
    });
  };
};

export const getPropertyInquiryError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_PROPERTY_INQUIRY_ERROR,
      error: error
    });
  };
};


export const sendMessage = (params = {}) => {
  return (dispatch) => {
    let url = `/api/owner_question_submit`;
    let promise = postUsingAjax(url, params).toPromise();
    return promise;
  };
};