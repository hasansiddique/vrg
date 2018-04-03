import {
  INITIATE_LOGIN_INFO_REQUEST,
  INITIATE_FORGOT_PASSWORD_REQUEST,
  INITIATE_USER_INFO_REQUEST,
  LOGIN_INFO_FAILED,
  LOGIN_INFO_RECEIVED,
  INITIATE_USER_CREATION,
  USER_CREATION_FAILED,
  USER_CREATION_COMPLETED,
  RESET_REGISTER_PAYLOAD,
  SELECTED_AUTH_MODAL,
  PASSWORD_UPDATE_FAILED,
  PASSWORD_UPDATE_SUCCESS,
} from './authentication.action';

const initialState = {
  isLogging: false,
  isUpdating: false,
  isAuthenticated: false,
  user: {},
  error: '',
  passUpdateMsg: '',
  registerPayload: {},
  isCreating: false,
  registerError: [],
  selectedAuthModal: '',
  ownerCreated: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_LOGIN_INFO_REQUEST:
      return Object.assign({}, state, {
        isLogging: action.isLogging,
      });

    case PASSWORD_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isUpdating: action.isUpdating,
        passUpdateMsg: action.passUpdateMsg,
      });

    case PASSWORD_UPDATE_FAILED:
      return Object.assign({}, state, {
        isUpdating: action.isUpdating,
        passUpdateMsg: action.passUpdateMsg,
      });

    case INITIATE_FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isUpdating: action.isUpdating,
      });

    case INITIATE_USER_INFO_REQUEST:
      return Object.assign({}, state, {
        isLogging: action.isLogging,
      });

    case LOGIN_INFO_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        isLogging: action.isLogging,
        isAuthenticated: action.isAuthenticated,
      });

    case LOGIN_INFO_RECEIVED:
      return Object.assign({}, state, {
        isLogging: action.isLogging,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      });

    case INITIATE_USER_CREATION:
      return Object.assign({}, state, {
        isCreating: action.isCreating,
        registerPayload: action.payload,
      });

    case USER_CREATION_COMPLETED:
      return Object.assign({}, state, {
        isCreating: action.isCreating,
        ownerCreated: action.ownerCreated
      });

    case USER_CREATION_FAILED:
      return Object.assign({}, state, {
        isCreating: action.isCreating,
        registerError: action.error,
      });

    case RESET_REGISTER_PAYLOAD:
      return Object.assign({}, state, {
        registerPayload: action.registerPayload,
      });

    case SELECTED_AUTH_MODAL:
      return Object.assign({}, state, {
        selectedAuthModal: action.selectedAuthModal,
      });

    default:
      return state;
  }
};

export default login;
