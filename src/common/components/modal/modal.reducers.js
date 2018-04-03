import {
  TOGGLE_MODAL_VISIBILITY,
  TOGGLE_MODAL_TYPE
} from './modal.actions';

let defaultState = {
  modalIsOpen: false,
  modalType: '',
};

export function modal(state = defaultState, action = {}) {

  switch (action.type) {

    case TOGGLE_MODAL_VISIBILITY:
      return Object.assign({}, state, {
        modalIsOpen: action.modalIsOpen
      });

    case TOGGLE_MODAL_TYPE:
      return Object.assign({}, state, {
        modalType: action.modalType
      });

    default:
      return state || {};
  }
}
