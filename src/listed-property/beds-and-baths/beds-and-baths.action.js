import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const UPDATE_UNIT_BEDROOMS_AND_BATHROOMS = 'UPDATE_UNIT_BEDROOMS_AND_BATHROOMS';

export const getUnitBedrooms = (unitId) => {
  return (dispatch) => {
    dispatch(updateUnitBedAndBathStore({
      isFetchingBedrooms: true
    }));
    let url = `/api/bedrooms`;
    let params = {
      unit_id: unitId
    };
    let observable = postUsingAjax(url, params);
    return observable.map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    }).toPromise().then((res) => {
      dispatch(updateUnitBedAndBathStore({
        isFetchingBedrooms: false,
        bedrooms: res.data.beds
      }));
      return res.data.beds;
    }).catch(() => {
      dispatch(updateUnitBedAndBathStore({
        isFetchingBedrooms: false
      }));
    });
  };
};

export const getUnitBathrooms = (unitId) => {
  return (dispatch) => {
    dispatch(updateUnitBedAndBathStore({
      isFetchingBathrooms: true
    }));
    let url = `/api/bathrooms`;
    let params = {
      unit_id: unitId
    };
    let observable = postUsingAjax(url, params);
    return observable.map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    }).toPromise().then((res) => {
      dispatch(updateUnitBedAndBathStore({
        isFetchingBathrooms: false,
        bathrooms: res.data.baths
      }));
      return res.data.baths;
    }).catch(() => {
      dispatch(updateUnitBedAndBathStore({
        isFetchingBathrooms: false
      }));
    });
  };
};

export const updateUnitBedAndBathStore = (payload) => {
  return {
    type: UPDATE_UNIT_BEDROOMS_AND_BATHROOMS,
    payload: payload
  };
};