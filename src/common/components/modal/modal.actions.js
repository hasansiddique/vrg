export const TOGGLE_MODAL_VISIBILITY = 'TOGGLE_MODAL_VISIBILITY';
export const TOGGLE_MODAL_TYPE = 'TOGGLE_MODAL_TYPE';

export const toggleModalVisibility = (status) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_MODAL_VISIBILITY,
      modalIsOpen: status
    });
  };
};

export const toggleModalType = (type) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_MODAL_TYPE,
      modalType: type
    });
  };
};
