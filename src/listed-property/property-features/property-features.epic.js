import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_UNIT_FEATURES_REQUEST,
  getUnitFeaturesCompleted,
  getUnitFeaturesFailed,
  getUnitFeaturesError
} from './property-features.action';

const getUnitFeatures = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_UNIT_FEATURES_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api//unit_features`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let featuresInfo = transformKeys.toCamelCase(res.response.DATA);
            return getUnitFeaturesCompleted(featuresInfo);
          } else {
            return getUnitFeaturesFailed();
          }
        })
        .catch(error => {
          state.dispatch(getUnitFeaturesFailed());
          state.dispatch(getUnitFeaturesError('Something went wrong while fetching property features.'));
          return Observable.empty();
        })
    );
};

export const propertyFeaturesEpics = combineEpics(
  getUnitFeatures
);
