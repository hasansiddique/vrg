import {omit} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs/Observable';

import {postUsingAjax, getUsingAjax} from '../api';
import transformKeys from '../transformKeys';
import storage from '../storage';

import {
  INITIATE_LOGIN_INFO_REQUEST,
  INITIATE_FORGOT_PASSWORD_REQUEST,
  INITIATE_USER_INFO_REQUEST,
  INITIATE_USER_CREATION,
  loginInfoReceived,
  loginInfoFailed,
  userCreationCompleted,
  userCreationFailed,
  passwordUpdateStatus,
} from './authentication.action';

const loginUser = (action$, state) => {
  return action$
    .ofType(INITIATE_LOGIN_INFO_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/authenticate`, action.payload)
        .map(res => {
          let userData = transformKeys.toCamelCase(res.response);
          storage.set('user', userData);
          return loginInfoReceived(userData);
        })
        .catch(error => {
          state.dispatch(loginInfoFailed('Something went wrong while logging in.'));
          return Observable.empty();
        })
    );
};

const updatePassword = (action$, state) => {
  return action$
    .ofType(INITIATE_FORGOT_PASSWORD_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/reset_password`, action.payload)
        .map(res => {
          if (res.response.STATUS === 'success') {
            return passwordUpdateStatus('SUCCESS');
          } else {
            return passwordUpdateStatus('FAILED');
          }
        })
        .catch(error => {
          state.dispatch(passwordUpdateStatus('FAILED'));
          return Observable.empty();
        })
    );
};


const getUser = (action$, state) => {
  return action$
    .ofType(INITIATE_USER_INFO_REQUEST)
    .switchMap(action => {
        let user = storage.get('user');
        let devicetoken = null;
        if (user) {
          devicetoken = user.devicetoken;
        }
        return getUsingAjax(`/mock/users/${devicetoken}`)
          .delay(2000)
          .map(res => {
            let userData = transformKeys.toCamelCase(res.response);
            // return loginInfoReceived(userData);
            return loginInfoReceived(user);
          })
          .catch(error => {
            state.dispatch(loginInfoFailed('Something went wrong while logging in.'));
            return Observable.empty();
          });
      }
    );
};

const createNewUser = (action$, state) => {
  return action$
    .ofType(INITIATE_USER_CREATION)
    .switchMap(action =>
      postUsingAjax(`/api/register_owner`, omit(action.payload, 'PASSWORD2'))
        .map(res => {
          let userData = transformKeys.toCamelCase(res.response);
          if (res.status === 201) {
            return userCreationCompleted(userData);
          }
          userCreationFailed({response: 'Something went wrong while creating user.'});
          return Observable.empty();
        })
        .catch(error => {
          userCreationFailed(error);
          return Observable.empty();
        })
    );
};

export const authenticationEpics = combineEpics(
  loginUser,
  getUser,
  createNewUser,
  updatePassword
);
