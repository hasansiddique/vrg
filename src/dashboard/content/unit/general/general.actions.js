import { getUsingAjax, postUsingAjax, getUsingAjaxNoRedirect, postUsingAjaxNoRedirect } from '../../../../common/api/index';
import transformKeys from '../../../../common/transformKeys';

export const UPDATE_OWNER_UNIT_GENERAL = 'UPDATE_OWNER_UNIT_GENERAL';

export const getOwnerUnitGeneral = (unitId) => {
  let url = `/api/general_info`;
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

export const updateOwnerUnitGeneral = (params) => {
  let url = `/api/general_info_update`;
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data;
  });
};

export const updateOwnerUnitGeneralStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_GENERAL,
    payload: payload
  };
};

export const getCountries = (continent = null) => {
  let url = `/aws/geodata/countries.json`;
  if(continent){
    url = `/aws/geodata/continent/prefetch_` + encodeURIComponent(continent) + '.json';
  }
  let observable = getUsingAjaxNoRedirect(url).map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  });
  return observable.toPromise().then((res) => {
    let countries = [];
    for (let i = 0; i < res.results.length; i++) {
      if(res.results[i].c){
        countries.push({
          name: res.results[i].c,
          label: res.results[i].c  
        });
      }else if(res.results[i].name){
        countries.push({
          name: res.results[i].name,
          label: res.results[i].name  
        });
      }
    }
    return countries;
  }).catch((err) => {
    // console.log(url, err);
  });
};

export const getStates = (country) => {
  let url = `/aws/geodata/countries/` + encodeURIComponent(country) + '/StateList.json';
  let observable = getUsingAjaxNoRedirect(url).map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  });
  return observable.toPromise().then((res) => {
    let states = [];
    for (let i = 0; i < res.results.length; i++) {
      if(res.results[i].s){
        states.push({
          name: res.results[i].s,
          label: res.results[i].s  
        });
      }
    }
    return states;
  }).catch((err) => {
    // console.log(url, err);
  });
};

export const getCities = (country, state) => {
  let url = `/aws/geodata/countries/` + encodeURIComponent(country) + '/prefetch_'+ encodeURIComponent(state) +'.json';
  let observable = getUsingAjaxNoRedirect(url).map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  });
  return observable.toPromise().then((res) => {
    let cities = [];
    for (let i = 0; i < res.results.length; i++) {
      if(res.results[i].l){
        cities.push({
          name: res.results[i].l,
          label: res.results[i].l
        });
      }
    }
    return cities;
  }).catch((err) => {
    // console.log(url, err);
  });
};

export const getUnitTypes = () => {
  let url = '/api/unit_types_get';
  let observable = postUsingAjaxNoRedirect(url).map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  });
  return observable.toPromise().then((res) => {
    return res.data;
  }).catch((err) => {
    // console.log(url, err);
  });
};