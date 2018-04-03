import {combineReducers} from 'redux';

// reducers
import restaurants from '../common/components/restaurants/restaurant.reducer';
import todo from '../common/components/things-todo/todo.reducer';
import shopping from '../common/components/shopping/shopping.reducer';
import transportation from '../common/components/transportation/transportation.reducer';
import others from '../common/components/others/others.reducer';
import properties from '../common/components/properties/properties.reducer';
import search from './search/search.reducer';
import travelStars from '../common/components/travel-stars/travel-stars.reducer';

const homeReducers = combineReducers({
  restaurants,
  todo,
  shopping,
  transportation,
  properties,
  search,
  travelStars,
  others
});

export default homeReducers;
