import {connect} from 'react-redux';

import LayoutSummary from './LayoutSummary.jsx';
import {initiateGetUnitSummary} from "./layout-summary.action";


const mapStateToProps = state => ({
  summaryInfo: state.listedProperty.propertySummary.summary,
  isFetching: state.listedProperty.propertySummary.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetUnitSummary: (payload) => dispatch(initiateGetUnitSummary(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSummary);
