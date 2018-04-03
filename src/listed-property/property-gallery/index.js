import {connect} from 'react-redux';

import PropertyGallery from './PropertyGallery.jsx';

import {
  initiateGetUnitImages
} from './property-gallery.action';

const mapStateToProps = state => ({
  imagesInfo: state.listedProperty.propertyGallery.images,
  isFetching: state.listedProperty.propertyGallery.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetUnitImages: (payload) => dispatch(initiateGetUnitImages(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGallery);
