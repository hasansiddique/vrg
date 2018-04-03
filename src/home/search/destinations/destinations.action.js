export const UPDATE_SEARCHED_LOCATION = 'UPDATE_SEARCHED_LOCATION';

export const updateLocationsList = (location) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCHED_LOCATION,
      searchedLocation: location,
    });
  };
};
