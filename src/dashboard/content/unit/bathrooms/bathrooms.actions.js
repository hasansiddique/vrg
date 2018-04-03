import {getUsingAjax, postUsingAjax} from '../../../../common/api/index';
import transformKeys from '../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_BATHROOMS = 'UPDATE_OWNER_UNIT_BATHROOMS';

export const getOwnerUnitBathrooms = (unitId) => {
  let url = `/api/bathrooms_get`;
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

export const getOwnerUnitBathroom = (unitId, bathroomId) => {
  let url = `/api/bathrooms_get`;
  let params = {
    unit_id: unitId,
    id: bathroomId
  };
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitBathrooms = (params, headers = {}) => {
  let url = `/api/bathrooms_update`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const addOwnerUnitBathrooms = (params, headers = {}) => {
  let url = `/api/bathrooms_insert`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const deleteOwnerUnitBathrooms = (params, headers = {}) => {
  let url = `/api/bathrooms_delete`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitBathroomsStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_BATHROOMS,
    payload: payload
  };
};
