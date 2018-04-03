import {postUsingAjax} from '../../../common/api/index';
import transformKeys from '../../../common/transformKeys';

export const UPDATE_OWNER_TENANTS = 'UPDATE_OWNER_TENANTS';

export const getTenants = (params = {}) => {
  return (dispatch) => {
    dispatch(updateTenants({isFetching: true, error: ''}));
    let url = `/api/list_tenants`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateTenants({tenants: res.data, isFetching: false, error: '', count: parseInt(res.totalcount)}));
    }).catch((err) => {
      return dispatch(updateTenants({isFetching: false, error: 'Error fetching tenants'}));
    });
  };
};

export const updateTenants = (payload) => {
  return {
    type: UPDATE_OWNER_TENANTS,
    payload: payload
  };
};
