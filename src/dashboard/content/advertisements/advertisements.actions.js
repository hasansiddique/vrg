import {postUsingAjax, postFormData} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_OWNER_ADVERTISEMENTS = 'UPDATE_OWNER_ADVERTISEMENTS';

export const getOwnerAdvertisements = (params = {}) => {
  return (dispatch) => {
    dispatch(updateOwnerAdvertisements({isFetching: true, error: ''}));
    let url = `/api/ads_list`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwnerAdvertisements({advertisements: res.data || [], isFetching: false, error: '', count: parseInt(res.totalcount)}));
    }).catch((err) => {
      return dispatch(updateOwnerAdvertisements({isFetching: false, error: 'Error fetching advertisements'}));
    });
  };
};

export const getOwnerAdvertisement = (params = {}) => {
  return (dispatch) => {
    let url = `/api/ads_list`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const updateAdvertisement = (params = {}) => {
  return (dispatch) => {
    let url = `/api/update_advertisement`;
    let promise = postFormData(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res;
    });
  };
};

export const updateOwnerAdvertisements = (payload) => {
  return {
    type: UPDATE_OWNER_ADVERTISEMENTS,
    payload: payload
  };
};
