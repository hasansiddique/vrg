import {connect} from 'react-redux';

import PropertyFeatures from './PropertyFeatures.jsx';
import {initiateGetUnitFeatures} from "./property-features.action";


const mapStateToProps = state => ({
  featuresInfo: state.listedProperty.propertyFeatures.features,
  isFetching: state.listedProperty.propertyDetails.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetUnitFeatures: (payload) => dispatch(initiateGetUnitFeatures(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyFeatures);
