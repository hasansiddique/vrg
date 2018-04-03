import {
  INITIATE_GET_HOME_RESTAURANTS_REQUEST,
  GET_HOME_RESTAURANTS_COMPLETED,
  GET_HOME_RESTAURANTS_FAILED,
  GET_HOME_RESTAURANTS_ERROR,
  SET_HOME_RESTAURANTS
} from './restaurant.action';

const initialState = {
  restaurantList: [],
  isFetching: false,
  error: '',
  total: 0
};

const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_RESTAURANTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_RESTAURANTS_COMPLETED:
      return Object.assign({}, state, {
        restaurantList: action.restaurants.data,
        isFetching: action.isFetching,
        count: action.restaurants.adcount ? action.restaurants.adcount : 0
      });

    case GET_HOME_RESTAURANTS_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_RESTAURANTS_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case SET_HOME_RESTAURANTS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default restaurants;
