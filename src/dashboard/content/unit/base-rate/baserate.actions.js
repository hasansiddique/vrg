import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const UPDATE_OWNER_UNIT_BASE_RATE = 'UPDATE_OWNER_UNIT_BASE_RATE';

export const getOwnerUnitBaseRate = (unitId) => {
  let url = `/api/base_rates_get`;
  let params = {
    unit_id: unitId
  };
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data.pop();
  });
};

export const updateOwnerUnitBaseRate = (params, headers = {}) => {
  let url = `/api/base_rates_update`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitBaseRateStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_BASE_RATE,
    payload: payload
  };
};
