import { getUsingAjax, postUsingAjax } from '../../../../../common/api/index';
import transformKeys from '../../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_MAIN_FEATURES = 'UPDATE_OWNER_UNIT_MAIN_FEATURES';

export const getOwnerUnitMainFeatures = (unitId) => {
  return (dispatch) => {
    dispatch(updateOwnerUnitMainFeaturesStore({ isFetching: true, error: '' }));
    let url = `/api/features_get`;
    let params = {
      unit_id: unitId
    };
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwnerUnitMainFeaturesStore({ features: res.data, isFetching: false, error: '' }));
    }).catch((err) => {
      return dispatch(updateOwnerUnitMainFeaturesStore({ isFetching: false, error: 'Error occured' }));
    });
  };
};

export const updateOwnerUnitMainFeatures = (params) => {
  return (dispatch) => {
    dispatch(updateOwnerUnitMainFeaturesStore({ isUpdating: true }));
    let url = `/api/features_update`;
    let promise = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    }).toPromise();
    return promise.then((res) => {
      dispatch(updateOwnerUnitMainFeaturesStore({ isUpdating: false }));
    }).catch((err) => {
      dispatch(updateOwnerUnitMainFeaturesStore({ isUpdating: false, error: 'Unable to update' }));
    });
  };
};

export const updateOwnerUnitMainFeaturesStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_MAIN_FEATURES,
    payload: payload
  };
};
