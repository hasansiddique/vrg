import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_PROPERTY_REVIEW_REQUEST,
  getPropertyReviewsCompleted,
  getPropertyReviewsError,
  getPropertyReviewsFailed
} from './property-reviews.action';

const getPropertyReviews = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_PROPERTY_REVIEW_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/customer_review`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let reviewsInfo = transformKeys.toCamelCase(res.response.DATA);
            return getPropertyReviewsCompleted(reviewsInfo);
          } else {
            return getPropertyReviewsFailed();
          }
        })
        .catch(error => {
          state.dispatch(getPropertyReviewsFailed());
          state.dispatch(getPropertyReviewsError('Something went wrong while fetching recent units.'));
          return Observable.empty();
        })
    );
};

export const propertyReviewEpics = combineEpics(
  getPropertyReviews
);
