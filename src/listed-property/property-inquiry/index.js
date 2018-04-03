import {connect} from 'react-redux';

import PropertyInquiry from './PropertyInquiry.jsx';
import {
  initiateGetPropertyInquiry,
  sendMessage
} from "./property-inquiry.action";

const mapStateToProps = state => ({
  inquiryInfo: state.listedProperty.propertyInquiry.inquiry,
  isFetching: state.listedProperty.propertyInquiry.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetPropertyInquiry: (payload) => dispatch(initiateGetPropertyInquiry(payload)),
  sendMessage: (payload) => dispatch(sendMessage(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyInquiry);
