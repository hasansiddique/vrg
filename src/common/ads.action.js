import {postUsingAjax} from 'common/api/index';

export const countAdClick = (adId) => {
  let url = `/api/count_click`;
  let params = {
    adID: adId
  };
  let observable = postUsingAjax(url, params);
  return observable.toPromise().then((res) => {
    return res;
  });
};