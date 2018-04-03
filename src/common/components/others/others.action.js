import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const INITIATE_GET_HOME_OTHERS_REQUEST = 'INITIATE_GET_HOME_OTHERS_REQUEST';
export const GET_HOME_OTHERS_COMPLETED = 'GET_HOME_OTHERS_COMPLETED';
export const GET_HOME_OTHERS_FAILED = 'GET_HOME_OTHERS_FAILED';
export const GET_HOME_OTHERS_ERROR = 'GET_HOME_OTHERS_ERROR';
export const SET_HOME_OTHERS = 'SET_HOME_OTHERS';

export const getOthers = (params) => {
  return (dispatch) => {
    let url = `/api/advertisement`;
    dispatch(setHomeOthers({
      isFetching: true,
      error: ''
    }));
    let observable = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    });
    return observable.toPromise().then((res) => {
      return dispatch(setHomeOthers({
        isFetching: false,
        othersList: res.data,
        count: res.adcount
      }));
    }).catch((err) => {
      return dispatch(setHomeOthers({
        isFetching: false,
        error: 'Something went wrong, Please try again'
      }));
    });
  };
};

export const initiateGetHomeOthers = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_OTHERS_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getHomeOthersCompleted = (restaurants) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_OTHERS_COMPLETED,
      restaurants: restaurants,
      isFetching: false
    });
  };
};

export const getHomeOthersFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_OTHERS_FAILED,
      isFetching: false
    });
  };
};

export const getHomeOthersError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_OTHERS_ERROR,
      error: error
    });
  };
};

export const setHomeOthers = (payload) => {
  return {
    type: SET_HOME_OTHERS,
    payload: payload
  };
};
