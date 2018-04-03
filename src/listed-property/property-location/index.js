import {connect} from 'react-redux';

import PropertyLocation from './PropertyLocation.jsx';

const mapStateToProps = state => ({
  detailsInfo: state.listedProperty.propertyDetails.details,
  isFetching: state.listedProperty.propertyDetails.isFetching,
  images: state.listedProperty.propertyGallery.images.images,
});

export default connect(mapStateToProps)(PropertyLocation);
