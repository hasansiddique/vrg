import {connect} from 'react-redux';

import PropertyBedsAndBaths from './BedsAndBaths.jsx';
import {
  getUnitBedrooms,
  getUnitBathrooms
} from "./beds-and-baths.action";
import {
  initiateGetUnitSummary
} from '../layout-summary/layout-summary.action';


const mapStateToProps = state => ({
  bedrooms: state.listedProperty.propertyBedsAndBaths.bedrooms,
  isFetchingBedrooms: state.listedProperty.propertyBedsAndBaths.isFetchingBedrooms,
  bathrooms: state.listedProperty.propertyBedsAndBaths.bathrooms,
  isFetchingBathrooms: state.listedProperty.propertyBedsAndBaths.isFetchingBathrooms,
  summaryInfo: state.listedProperty.propertySummary.summary,
  isFetching: state.listedProperty.propertySummary.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getUnitBedrooms: (payload) => dispatch(getUnitBedrooms(payload)),
  getUnitBathrooms: (payload) => dispatch(getUnitBathrooms(payload)),
  initiateGetUnitSummary: (payload) => dispatch(initiateGetUnitSummary(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyBedsAndBaths);
