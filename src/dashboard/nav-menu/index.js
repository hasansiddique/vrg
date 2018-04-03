import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import NavMenu from './NavMenu.jsx';
import {toggleSelectedNavItem} from "../dashboard.action";
import {logoutUser} from "../../common/authentication/authentication.action";

const mapStateToProps = state => ({
  selectedNavItem: state.advertiserDashboard.dashboard.selectedNavItem,
});

const mapDispatchToProps = dispatch => ({
  toggleSelectedNavItem: (item) => dispatch(toggleSelectedNavItem(item)),
  logoutUser: () => dispatch(logoutUser()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavMenu));
