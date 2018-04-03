import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_UNIT_IMAGES_REQUEST,
  getUnitImagesCompleted,
  getUnitImagesFailed,
  getUnitImagesError
} from './property-gallery.action';

const getUnitImages = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_UNIT_IMAGES_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/unit_image_gallery`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let galleryInfo = transformKeys.toCamelCase(res.response.DATA);
            return getUnitImagesCompleted(galleryInfo);
          } else {
            return getUnitImagesFailed();
          }
        })
        .catch(error => {
          state.dispatch(getUnitImagesFailed());
          state.dispatch(getUnitImagesError('Something went wrong while fetching properties.'));
          return Observable.empty();
        })
    );
};

export const propertyGalleryEpics = combineEpics(
  getUnitImages
);
