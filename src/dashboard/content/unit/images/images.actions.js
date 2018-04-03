import {postUsingAjax, postFormData} from '../../../../common/api/index';
import transformKeys from '../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_IMAGES = 'UPDATE_OWNER_UNIT_IMAGES';

export const getOwnerUnitImages = (unitId) => {
  let url = `/api/images_get`;
  let params = {
    unit_id: unitId
  };
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitImages = (params, headers = {}) => {
  let url = `/api/bedrooms_update`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitImage = (params) => {
  let url = `/api/images_update`;
  let promise = postUsingAjax(url, params).map((res) => {
    return transformKeys.toLowerCase(res.response);
  }).toPromise();
  return promise.then((res) => {
    res.data;
  });
};

export const addOwnerUnitImages = (params, headers = {}) => {
  let url = `/api/images_insert`;
  let observable = postFormData(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const deleteOwnerUnitImages = (params, headers = {}) => {
  let url = `/api/images_delete`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res;
  });
};

export const uploadOwnerUnitImages = (params, headers = {}) => {
  let url = `/api/images_insert`;
  let formData = new FormData();
  for (let key in params) {
    formData.append(key, params[key]);
  }
  let observable = postFormData(url, formData, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitImagesStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_IMAGES,
    payload: payload
  };
};
