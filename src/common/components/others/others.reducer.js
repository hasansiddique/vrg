import {
  INITIATE_GET_HOME_OTHERS_REQUEST,
  GET_HOME_OTHERS_COMPLETED,
  GET_HOME_OTHERS_FAILED,
  GET_HOME_OTHERS_ERROR,
  SET_HOME_OTHERS
} from './others.action';

const initialState = {
  othersList: [],
  isFetching: false,
  error: '',
  count: 0
};

const others = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_OTHERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_OTHERS_COMPLETED:
      return Object.assign({}, state, {
        othersList: action.others.data,
        isFetching: action.isFetching,
        count: action.others.adcount ? action.others.adcount : 0
      });

    case GET_HOME_OTHERS_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_OTHERS_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case SET_HOME_OTHERS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default others;
