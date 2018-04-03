import {connect} from 'react-redux';

import Advertisement from './Advertisement.jsx';
import {toggleModalType, toggleModalVisibility} from "../common/components/modal/modal.actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Advertisement);
