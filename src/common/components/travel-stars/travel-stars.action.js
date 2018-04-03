export const INITIATE_GET_HOME_TRAVEL_STARS_REQUEST = 'INITIATE_GET_HOME_TRAVEL_STARS_REQUEST';
export const GET_HOME_TRAVEL_STARS_COMPLETED = 'GET_HOME_TRAVEL_STARS_COMPLETED';
export const GET_HOME_TRAVEL_STARS_FAILED = 'GET_HOME_TRAVEL_STARS_FAILED';
export const GET_HOME_TRAVEL_STARS_ERROR = 'GET_HOME_TRAVEL_STARS_ERROR';

export const initiateGetHomeTravelStars = (params = {}) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_TRAVEL_STARS_REQUEST,
      isFetching: true,
      params: params
    });
  };
};

export const getHomeTravelStarsCompleted = (travelStars) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TRAVEL_STARS_COMPLETED,
      travelStars: travelStars,
      isFetching: false
    });
  };
};

export const getHomeTravelStarsFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TRAVEL_STARS_FAILED,
      isFetching: false
    });
  };
};

export const getHomeTravelStarsError = (error) => {
  return dispatch => {
    dispatch(travelStarErrorAction(error));
  };
};

export const travelStarErrorAction = (error) => {
  return {
    type: GET_HOME_TRAVEL_STARS_ERROR,
    error: error
  };
};
