export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export const incrementCounter = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_COUNTER
    });
  };
};
