import {combineEpics} from 'redux-observable';

//epics
import {restaurantEpics} from '../common/components/restaurants/restaurant.epic';
import {todoEpics} from '../common/components/things-todo/todo.epic';
import {shoppingEpics} from '../common/components/shopping/shopping.epic';
import {transportationEpics} from '../common/components/transportation/transportation.epic';
import {propertiesEpics} from '../common/components/properties/properties.epic';
import {searchEpics} from './search/search.epic';
import {travelStarEpics} from '../common/components/travel-stars/travel-stars.epic';

export const homeEpics = combineEpics(
  restaurantEpics,
  todoEpics,
  shoppingEpics,
  transportationEpics,
  propertiesEpics,
  searchEpics,
  travelStarEpics
);
