import { getUsingAjax, postUsingAjax } from '../../../../common/api';
import transformKeys from '../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_GUEST_INFO = 'UPDATE_OWNER_UNIT_GUEST_INFO';

export const getOwnerUnitGuestInfo = (unitId) => {
  let url = `/api/guest_info_get`;
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

export const updateOwnerUnitGuestInfo = (params, headers = {}) => {
  let url = `/api/guest_info_update`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitGuestInfoStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_GUEST_INFO,
    payload: payload
  };
};
