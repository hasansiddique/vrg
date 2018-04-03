import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const INITIATE_GET_HOME_TRANSPORTATION_REQUEST = 'INITIATE_GET_HOME_TRANSPORTATION_REQUEST';
export const GET_HOME_TRANSPORTATION_COMPLETED = 'GET_HOME_TRANSPORTATION_COMPLETED';
export const GET_HOME_TRANSPORTATION_FAILED = 'GET_HOME_TRANSPORTATION_FAILED';
export const GET_HOME_TRANSPORTATION_ERROR = 'GET_HOME_TRANSPORTATION_ERROR';
export const SET_HOME_TRANSPORTATION = 'SET_HOME_TRANSPORTATION';

export const getTransportation = (params) => {
  return (dispatch) => {
    let url = `/api/advertisement`;
    dispatch(setHomeTransportation({
      isFetching: true,
      error: ''
    }));
    let observable = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    });
    return observable.toPromise().then((res) => {
      return dispatch(setHomeTransportation({
        isFetching: false,
        transportationList: res.data,
        count: res.adcount
      }));
    }).catch((err) => {
      return dispatch(setHomeTransportation({
        isFetching: false,
        error: 'Something went wrong, Please try again'
      }));
    });
  };
};


export const initiateGetHomeTransportation = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_TRANSPORTATION_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getHomeTransportationCompleted = (transportation) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TRANSPORTATION_COMPLETED,
      transportation: transportation,
      isFetching: false
    });
  };
};

export const getHomeTransportationFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TRANSPORTATION_FAILED,
      isFetching: false
    });
  };
};

export const getHomeTransportationError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TRANSPORTATION_ERROR,
      error: error
    });
  };
};

export const setHomeTransportation = (payload) => {
  return {
    type: SET_HOME_TRANSPORTATION,
    payload: payload
  };
};