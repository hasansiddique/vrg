import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_OWNER_USER_PROFILE = 'UPDATE_OWNER_USER_PROFILE';

export const getUserProfileCounters = (params = {}) => {
  return (dispatch) => {
    dispatch(updateOwerUnits({isFetching: true, error: ''}));
    let url = `/api/counters`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwerUnits({counters: res.data, isFetching: false, error: ''}));
    }).catch((err) => {
      return dispatch(updateOwerUnits({isFetching: false, error: 'Error fetching counters'}));
    });
  };
};

export const updateOwerUnits = (payload) => {
  return {
    type: UPDATE_OWNER_USER_PROFILE,
    payload: payload
  };
};
