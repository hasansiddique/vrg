import {connect} from 'react-redux';

import PropertyReviews from './PropertyReviews.jsx';
import {initiateGetPropertyReviews, getPropertyReviewsCompleted} from "./property-reviews.action";

const mapStateToProps = state => ({
  reviewsInfo: state.listedProperty.propertyReviews.reviews,
  isFetching: state.listedProperty.propertyReviews.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetPropertyReviews: (payload) => dispatch(initiateGetPropertyReviews(payload)),
  getPropertyReviewsCompleted: (data) => dispatch(getPropertyReviewsCompleted(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyReviews);
