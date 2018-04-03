import {getUsingAjax, postUsingAjax} from '../../../../../common/api/index';
import transformKeys from '../../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_COMMUNITY_FEATURES = 'UPDATE_OWNER_UNIT_COMMUNITY_FEATURES';

export const getOwnerUnitCommunityFeatures = (unitId) => {
  return (dispatch) => {
    dispatch(updateOwnerUnitCommunityFeaturesStore({ isFetching: true, error: '' }));
    let url = `/api/features_list_get`;
    let params = {
      unit_id: unitId
    };
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwnerUnitCommunityFeaturesStore({ features: res.data, isFetching: false, error: '' }));
    }).catch((err) => {
      return dispatch(updateOwnerUnitCommunityFeaturesStore({ isFetching: false, error: 'Error occured' }));
    });
  };
};

export const updateOwnerUnitCommunityFeatures = (params) => {
  return (dispatch) => {
    dispatch(updateOwnerUnitCommunityFeaturesStore({ isUpdating: true }));
    let url = `/api/features_list_update`;
    let promise = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    }).toPromise();
    return promise.then((res) => {
      dispatch(updateOwnerUnitCommunityFeaturesStore({ isUpdating: false }));
    }).catch((err) => {
      dispatch(updateOwnerUnitCommunityFeaturesStore({ isUpdating: false, error: 'Unable to update' }));
    });
  };
};

export const updateOwnerUnitCommunityFeaturesStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_COMMUNITY_FEATURES,
    payload: payload
  };
};
