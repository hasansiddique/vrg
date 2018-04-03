export const SET_MOBILE_VISIBILITY = 'SET_MOBILE_VISIBILITY';

export const setFooterVisibility = (state) => {
  return dispatch => {
    dispatch({
      type: SET_MOBILE_VISIBILITY,
      payload: { showFooter: state }
    });
  };
};

export const setIsMobile = (state) => {
  return dispatch => {
    dispatch({
      type: SET_MOBILE_VISIBILITY,
      payload: { isMobile: state }
    });
  };
};
