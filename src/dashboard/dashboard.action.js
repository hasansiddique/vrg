export const TOGGLE_SELECTED_NAV_MENU_ITEM = 'TOGGLE_SELECTED_NAV_MENU_ITEM';

export const toggleSelectedNavItem = (item) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SELECTED_NAV_MENU_ITEM,
      selectedNavItem: item,
    });
  };
};
