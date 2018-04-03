import {connect} from 'react-redux';
import Dashboard from './Dashboard.jsx';

const mapStateToProps = state => ({
  currentUser: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
