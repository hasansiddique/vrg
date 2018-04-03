import {ajax} from 'rxjs/observable/dom/ajax';
import storage from 'common/storage';

const handleError = (err) => {
  if(window){
    if(err.status == 403){
      window.location.replace('/unauthorized');
    }
  }
};

export const getUsingAjax = (url, headers = {}) => {
  let user = storage.get('user');
  if (user) {
    if (url.match(/\?/)) {
      url += '&deviceToken=' + user.devicetoken;
    } else {
      url += '?deviceToken=' + user.devicetoken;
    }
  }
  return ajax.get(url, Object.assign({}, headers)).catch(handleError);
};

export const getUsingAjaxNoRedirect = (url, headers = {}) => {
  let user = storage.get('user');
  if (user) {
    if (url.match(/\?/)) {
      url += '&deviceToken=' + user.devicetoken;
    } else {
      url += '?deviceToken=' + user.devicetoken;
    }
  }
  return ajax.get(url, Object.assign({}, headers)).catch((err) => {

  });
};

export const postUsingAjax = (url, payload = {}, headers = {}) => {
  headers['Content-Type'] = 'application/json';
  let user = storage.get('user');
  if (user) {
    payload.deviceToken = user.devicetoken;
  }
  return ajax.post(url, payload, Object.assign({}, headers)).catch(handleError);
};

export const postUsingAjaxNoRedirect = (url, payload = {}, headers = {}) => {
  headers['Content-Type'] = 'application/json';
  let user = storage.get('user');
  if (user) {
    payload.deviceToken = user.devicetoken;
  }
  return ajax.post(url, payload, Object.assign({}, headers)).catch((err) => {

  });
};

export const postUsingAjaxPublic = (url, payload = {}, headers = {}) => {
  headers['Content-Type'] = 'application/json';
  return ajax.post(url, payload, Object.assign({}, headers)).catch(handleError);
};

export const postFormData = (url, payload = {}, headers = {}) => {
  let user = storage.get('user');
  if (user) {
    payload.append('deviceToken', user.devicetoken);
  }
  return ajax.post(url, payload, Object.assign({}, headers)).catch(handleError);
};
