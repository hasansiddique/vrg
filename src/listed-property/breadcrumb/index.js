import {connect} from 'react-redux';

import BreadCrumb from './BreadCrumb.jsx';
import {initiateGetUnitBreadcrumb} from "./breadcrumb.action";


const mapStateToProps = state => ({
  propertyDetails: state.listedProperty.propertyDetails.details,
  isFetching: state.listedProperty.propertyDetails.isFetching,
  breadcrumb: state.listedProperty.breadcrumb
});

const mapDispatchToProps = dispatch => ({
  initiateGetUnitBreadcrumb: (payload) => dispatch(initiateGetUnitBreadcrumb(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumb);
