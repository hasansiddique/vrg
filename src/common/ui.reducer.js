import {
  SET_MOBILE_VISIBILITY
} from './ui.actions';

const initialState = {
  showFooter: true,
  isMobile: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOBILE_VISIBILITY:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default ui;
