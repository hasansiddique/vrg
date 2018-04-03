import { getUsingAjax, postUsingAjax } from '../../../../common/api';
import transformKeys from '../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_FEATURES = 'UPDATE_OWNER_UNIT_FEATURES';

export const getOwnerUnitFeatures = (unitId) => {
  let url = `/api/features_unit_get`;
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

export const updateOwnerUnitFeatures = (params) => {
  let url = `/api/general_info_update`;
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitFeaturesStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_FEATURES,
    payload: payload
  };
};
