import {connect} from 'react-redux';
import Unit from './Unit.jsx';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  
});
const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Unit));
