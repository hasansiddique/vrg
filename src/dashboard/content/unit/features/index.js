import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Features from './Features.jsx';

const mapStateToProps = state => ({
  
});
const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Features));
