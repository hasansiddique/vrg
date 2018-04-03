import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import EditAd from './EditAd.jsx';
import {
  getOwnerAdvertisement,
  updateAdvertisement
} from '../advertisements.actions';
import {
  getAdCategoryList
} from '../../../../advertisement/wizard/wizard.action';

const mapStateToProps = state => ({
  locationsList: state.home.search.locationsList,
  adCategoryList: state.advertisement.adWizard.adCategoryList
});

const mapDispatchToProps = (dispatch) => ({
  getOwnerAdvertisement: (params) => dispatch(getOwnerAdvertisement(params)),
  updateAdvertisement: (params) => dispatch(updateAdvertisement(params)),
  getAdCategoryList: () => dispatch(getAdCategoryList())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAd));
