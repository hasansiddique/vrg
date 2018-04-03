import {postUsingAjax} from '../../../common/api/index';
import transformKeys from '../../../common/transformKeys';

export const UPDATE_OWNER_UNITS = 'UPDATE_OWNER_UNITS';

export const getOwnerUnits = (params = {}) => {
  return (dispatch) => {
    dispatch(updateOwerUnits({isFetching: true, error: ''}));
    let url = `/api/list_units`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwerUnits({units: res.data, isFetching: false, error: '', count: parseInt(res.totalcount)}));
    }).catch((err) => {
      return dispatch(updateOwerUnits({isFetching: false, error: 'Error fetching units'}));
    });
  };
};

export const insertUnit = (params) => {
  let url = '/api/unit_insert';
  let promise = postUsingAjax(url, params).map((res) => {
    return transformKeys.toLowerCase(res.response);
  }).toPromise();
  return promise.then((res) => {
    return res;
  }).catch((err) => {
    return err;
  });
};

export const updateOwerUnits = (payload) => {
  return {
    type: UPDATE_OWNER_UNITS,
    payload: payload
  };
};
