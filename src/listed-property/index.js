import {connect} from 'react-redux';
import {initiateGetUnitDetails} from "./property-details/property-details.action";

import ListedProperty from './ListedProperty.jsx';


const mapStateToProps = state => ({
  detailsInfo: state.listedProperty.propertyDetails.details,
  isFetchingPD: state.listedProperty.propertyDetails.isFetching,
  error: state.listedProperty.propertyDetails.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    initiateGetUnitDetails: (payload) => dispatch(initiateGetUnitDetails(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListedProperty);
