import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_OWNER_DEALS = 'UPDATE_OWNER_DEALS';

export const getOwnerDeals = (params = {}) => {
  return (dispatch) => {
    let reset = params.reset || false;
    if(reset){
      dispatch(updateOwnerDeals({
        deals: [],
        count: 0
      }));
    }
    dispatch(updateOwnerDeals({isFetching: true, error: '', type: params.type}));
    let url = `/api/deals_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateOwnerDeals({deals: res.data, isFetching: false, error: '', count: parseInt(res.totalcount)}));
    }).catch((err) => {
      return dispatch(updateOwnerDeals({isFetching: false, error: 'Error fetching deals'}));
    });
  };
};

export const getOwnerDeal = (params = {}) => {
  return (dispatch) => {
    let url = `/api/deals_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const updateOwnerDeal = (params = {}) => {
  return (dispatch) => {
    let url = `/api/deals_update`;
    dispatch(updateOwnerDeals({ updating: true }));
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      dispatch(updateOwnerDeals({ updating: false }));
      return res.data;
    }).catch((err) => {
      dispatch(updateOwnerDeals({ updating: false }));
      return err;
    });
  };
};

export const addOwnerDeal = (params = {}) => {
  return (dispatch) => {
    let url = `/api/deals_insert`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const refreshOwnerDeal = (deal) => {
  return (dispatch) => {
    let url = `/api/deals_renew`;
    let params = {
      deal_id: deal.id
    };
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const deleteOwnerDeal = (deal, index) => {
  return (dispatch) => {
    let url = `/api/deals_delete`;
    let params = {
      deal_id: deal.id
    };
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
  };
};

export const getUnits = (params = {}) => {
  return (dispatch) => {
    let url = `/api/deals_unit_list_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const getUnitPrice = (params = {}) => {
  return (dispatch) => {
    let url = `/api/deals_calculate_price_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const getDealCategories = (params = {}) => {
  return (dispatch) => {
    let url = `/api/deals_category_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  };
};

export const updateOwnerDeals = (payload) => {
  return {
    type: UPDATE_OWNER_DEALS,
    payload: payload
  };
};
