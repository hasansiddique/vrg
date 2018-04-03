export const INITIATE_GET_UNIT_IMAGES_REQUEST = 'INITIATE_GET_UNIT_IMAGES_REQUEST';
export const GET_AVAILABILITY_UNIT_IMAGES_COMPLETED = 'GET_AVAILABILITY_UNIT_IMAGES_COMPLETED';
export const GET_AVAILABILITY_UNIT_IMAGES_FAILED = 'GET_AVAILABILITY_UNIT_IMAGES_FAILED';
export const GET_AVAILABILITY_UNIT_IMAGES_ERROR = 'GET_AVAILABILITY_UNIT_IMAGES_ERROR';

export const initiateGetUnitImages = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_UNIT_IMAGES_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getUnitImagesCompleted = (images) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_IMAGES_COMPLETED,
      images: images,
      isFetching: false
    });
  };
};

export const getUnitImagesFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_IMAGES_FAILED,
      isFetching: false
    });
  };
};

export const getUnitImagesError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_AVAILABILITY_UNIT_IMAGES_ERROR,
      error: error
    });
  };
};
