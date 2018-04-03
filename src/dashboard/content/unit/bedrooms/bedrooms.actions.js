import { getUsingAjax, postUsingAjax } from '../../../../common/api';
import transformKeys from '../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_BEDROOMS = 'UPDATE_OWNER_UNIT_BEDROOMS';

export const getOwnerUnitBedrooms = (unitId) => {
  let url = `/api/bedrooms_get`;
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

export const getOwnerUnitBedroom = (unitId, roomId) => {
  let url = `/api/bedrooms_get`;
  let params = {
    unit_id: unitId,
    id: roomId
  };
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitBedrooms = (params, headers = {}) => {
  let url = `/api/bedrooms_update`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const addOwnerUnitBedrooms = (params, headers = {}) => {
  let url = `/api/bedrooms_insert`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const deleteOwnerUnitBedrooms = (params, headers = {}) => {
  let url = `/api/bedrooms_delete`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitBedroomsStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_BEDROOMS,
    payload: payload
  };
};
