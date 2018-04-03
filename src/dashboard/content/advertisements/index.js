import {connect} from 'react-redux';
import Advertisements from './Advertisements.jsx';
import {
  getOwnerAdvertisements
} from './advertisements.actions';
import {
  fetchLocationsList
} from "../../../home/search/search.action";
import {toggleModalType, toggleModalVisibility} from "../../../common/components/modal/modal.actions";


const mapStateToProps = state => ({
  advertisements: state.advertiserDashboard.advertisements.advertisements,
  isFetching: state.advertiserDashboard.advertisements.isFetching,
  error: state.advertiserDashboard.advertisements.error,
  count: state.advertiserDashboard.advertisements.count,
  locationsList: state.home.search.locationsList
});

const mapDispatchToProps = (dispatch) => ({
  getOwnerAdvertisements: (params) => dispatch(getOwnerAdvertisements(params)),
  toggleModalVisibility: (status) => dispatch(toggleModalVisibility(status)),
  toggleModalType: (type) => dispatch(toggleModalType(type)),
  fetchLocationsList: () => dispatch(fetchLocationsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertisements);
