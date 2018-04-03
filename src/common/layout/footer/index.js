import {connect} from 'react-redux';

import Footer from './Footer.jsx';

const mapStateToProps = state => ({
  showFooter: state.ui.showFooter
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
