import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import DashboardContent from './DashboardContent.jsx';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(DashboardContent));
