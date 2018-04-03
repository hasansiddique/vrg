import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import AllListings from './AllListings.jsx';
import {initiateGetAllProperties} from "./all-listings.action";

const mapStateToProps = state => ({
  encryptedUserId: state.listedProperty.propertyInquiry.inquiry.encryptedUserId,
  properties: state.allListings.properties,
  isFetching: state.allListings.isFetching,
  error: state.allListings.error,
});

const mapDispatchToProps = dispatch => ({
  initiateGetAllProperties: (payload) => dispatch(initiateGetAllProperties(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllListings));
