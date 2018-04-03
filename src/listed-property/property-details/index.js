import {connect} from 'react-redux';

import PropertyDetails from './PropertyDetails.jsx';
import {initiateGetUnitDetails} from "./property-details.action";


const mapStateToProps = state => ({
  detailsInfo: state.listedProperty.propertyDetails.details,
  isFetching: state.listedProperty.propertyDetails.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetUnitDetails: (payload) => dispatch(initiateGetUnitDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
