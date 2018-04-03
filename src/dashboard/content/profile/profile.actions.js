import {postUsingAjax, postFormData} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_OWNER_PROFILE = 'UPDATE_OWNER_PROFILE';

export const getOwnerProfile = (params = {}) => {
  return (dispatch) => {
    dispatch(updateOwnerProfileStore({isFetching: true, error: ''}));
    let url = `/api/get_profile`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwnerProfileStore({profile: res.data, isFetching: false, error: '', count: parseInt(res.totalcount)}));
    }).catch((err) => {
      return dispatch(updateOwnerProfileStore({isFetching: false, error: 'Error fetching profile'}));
    });
  };
};

export const updateOwnerProfile = (params) => {
  return (dispatch) => {
    let url = '/api/update_profile';
    dispatch(updateOwnerProfileStore({
      updating: true
    }));
    let formData = new FormData();
    for(let key in params){
      formData.append(key, params[key]);
    }
    let promise = postFormData(url, formData).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      dispatch(updateOwnerProfileStore({
        updating: false
      }));
      return res;
    }).catch((err) => {
      dispatch(updateOwnerProfileStore({
        updating: false
      }));
      return err;
    });
  };
};

export const getStates = (params) => {
  let url = '/api/states_get';
  let promise = postUsingAjax(url, params).map((res) => {
    return transformKeys.toLowerCase(res.response);
  }).toPromise();
  return promise.then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

export const updateOwnerProfileStore = (payload) => {
  return {
    type: UPDATE_OWNER_PROFILE,
    payload: payload
  };
};
