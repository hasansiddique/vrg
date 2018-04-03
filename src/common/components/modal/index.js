import {connect} from 'react-redux';

import Modal from './Modal.jsx';

import {
  toggleModalType,
  toggleModalVisibility
} from './modal.actions';

const mapStateToProps = state => ({
  modalIsOpen: state.modal.modalIsOpen,
  modalType: state.modal.modalType,
});

const mapDispatchToProps = dispatch => ({
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
