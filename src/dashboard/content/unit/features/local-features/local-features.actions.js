import { getUsingAjax, postUsingAjax } from '../../../../../common/api/index';
import transformKeys from '../../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_LOCAL_FEATURES = 'UPDATE_OWNER_UNIT_LOCAL_FEATURES';

export const getOwnerUnitLocalFeatures = (unitId) => {
  return (dispatch) => {
    dispatch(updateOwnerUnitLocalFeaturesStore({ isFetching: true, error: '' }));
    let url = `/api/features_unit_get`;
    let params = {
      unit_id: unitId
    };
    let promise = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwnerUnitLocalFeaturesStore({ features: res.data, isFetching: false, error: '' }));
    }).catch((err) => {
      return dispatch(updateOwnerUnitLocalFeaturesStore({ isFetching: false, error: 'Error occured' }));
    });
  };
};

export const updateOwnerUnitLocalFeatures = (params) => {
  return (dispatch) => {
    dispatch(updateOwnerUnitLocalFeaturesStore({ isUpdating: true }));
    let url = `/api/features_unit_update`;
    let promise = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    }).toPromise();
    return promise.then((res) => {
      dispatch(updateOwnerUnitLocalFeaturesStore({ isUpdating: false }));
    }).catch((err) => {
      dispatch(updateOwnerUnitLocalFeaturesStore({ isUpdating: false, error: 'Unable to update' }));
    });
  };
};

export const updateOwnerUnitLocalFeaturesStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_LOCAL_FEATURES,
    payload: payload
  };
};
