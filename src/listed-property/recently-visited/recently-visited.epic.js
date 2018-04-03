import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_RECENT_UNI_REQUEST,
  getRecentUnitsCompleted,
  getRecentUnitsFailed,
  getRecentUnitsError
} from './recently-visited.action';

const getRecentUnits = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_RECENT_UNI_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/recently_visited`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let galleryInfo = transformKeys.toCamelCase(res.response.DATA);
            return getRecentUnitsCompleted(galleryInfo);
          } else {
            return getRecentUnitsFailed();
          }
        })
        .catch(error => {
          state.dispatch(getRecentUnitsFailed());
          state.dispatch(getRecentUnitsError('Something went wrong while fetching recent units.'));
          return Observable.empty();
        })
    );
};

export const recentUnitEpics = combineEpics(
  getRecentUnits
);
