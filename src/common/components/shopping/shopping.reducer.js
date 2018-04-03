import {
  INITIATE_GET_HOME_SHOPPING_REQUEST,
  GET_HOME_SHOPPING_COMPLETED,
  GET_HOME_SHOPPING_FAILED,
  GET_HOME_SHOPPING_ERROR,
  SET_HOME_SHOPPING
} from './shopping.action';

const initialState = {
  shoppingList: [],
  isFetching: false,
  error: '',
  count: 0
};

const shopping = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_SHOPPING_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_SHOPPING_COMPLETED:
      return Object.assign({}, state, {
        shoppingList: action.shopping,
        isFetching: action.isFetching
      });

    case GET_HOME_SHOPPING_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_SHOPPING_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case SET_HOME_SHOPPING:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default shopping;
