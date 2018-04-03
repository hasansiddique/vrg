import {get, omit} from 'lodash';
import storage from '../storage';
import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const INITIATE_LOGIN_INFO_REQUEST = 'INITIATE_LOGIN_INFO_REQUEST';
export const INITIATE_FORGOT_PASSWORD_REQUEST = 'INITIATE_FORGOT_PASSWORD_REQUEST';
export const INITIATE_USER_INFO_REQUEST = 'INITIATE_USER_INFO_REQUEST';
export const LOGIN_INFO_RECEIVED = 'LOGIN_INFO_RECEIVED';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILED = 'PASSWORD_UPDATE_FAILED';
export const LOGIN_INFO_FAILED = 'LOGIN_INFO_FAILED';
export const INITIATE_USER_CREATION = 'INITIATE_USER_CREATION';
export const USER_CREATION_COMPLETED = 'USER_CREATION_COMPLETED';
export const USER_CREATION_FAILED = 'USER_CREATION_FAILED';
export const RESET_REGISTER_PAYLOAD = 'RESET_REGISTER_PAYLOAD';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SELECTED_AUTH_MODAL = 'SELECTED_AUTH_MODAL';

export const initiateLoginInfo = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_LOGIN_INFO_REQUEST,
      isLogging: true,
      payload
    });
  };
};

export const initiateForgotPasswordRequest = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_FORGOT_PASSWORD_REQUEST,
      isUpdating: true,
      payload
    });
  };
};

export const registerOwner = (payload, headers = {}) => {
  return (dispatch) =>  {
    let promise = postUsingAjax(`/api/register_owner`, omit(payload, 'PASSWORD2'))
                  .map(res => {
                    let userData = transformKeys.toCamelCase(res.response);
                    return userData;
                  }).toPromise();
    return promise.then((res) => {
      if(res.status == false){
        return dispatch(userCreationFailed(res.errmsgs));
      }else{
        return dispatch(userCreationCompleted(res));
      }
    }).catch((err) => {
      return dispatch(userCreationFailed(['Something went wrong while creating user.']));
    });
  };
};

export const initiateUserInfo = () => {
  return dispatch => {
    let promise = postUsingAjax(`/api/counters`).toPromise();
    promise.then(() => {
      let user = storage.get('user');
      dispatch(loginInfoReceived(user));
    }).catch(error => {
      dispatch(loginInfoFailed('Something went wrong while logging in.'));
    });
  };
};

export const loginInfoReceived = (user) => {
  return dispatch => {
    return dispatch({
      type: LOGIN_INFO_RECEIVED,
      isLogging: false,
      isAuthenticated: true,
      user: user
    });
  };
};


export const loginInfoFailed = (error) => {
  return dispatch => {
    dispatch({
      type: LOGIN_INFO_FAILED,
      isLogging: false,
      isAuthenticated: false,
      error: error
    });
  };
};

export const initiateUserCreation = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_USER_CREATION,
      isCreating: true,
      payload
    });
  };
};

export const passwordUpdateStatus = (message) => {
  return dispatch => {
    dispatch({
      type: PASSWORD_UPDATE_FAILED,
      isUpdating: false,
      passUpdateMsg: message,
    });
  };
};

export const userCreationCompleted = () => {
  return dispatch => {
    dispatch({
      type: USER_CREATION_COMPLETED,
      isCreating: false,
      ownerCreated: true
    });
  };
};

export const userCreationFailed = (error) => {
  return dispatch => {
    dispatch({
      type: USER_CREATION_FAILED,
      isCreating: false,
      error: error
    });
  };
};

export const resetRegisterPayload = () => {
  return dispatch => {
    dispatch({
      type: RESET_REGISTER_PAYLOAD,
      registerPayload: {}
    });
  };
};

export const logoutUser = () => {
  storage.clear();
  return dispatch => {
    dispatch({
      type: LOGOUT_USER,
    });
  };
};


export const selectedAuthModalType = (type) => {
  return dispatch => {
    dispatch({
      type: SELECTED_AUTH_MODAL,
      selectedAuthModal: type,
    });
  };
};
