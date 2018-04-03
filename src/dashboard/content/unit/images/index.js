import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Images from './Images.jsx';
import {
  getOwnerUnitImages,
  updateOwnerUnitImagesStore,
  deleteOwnerUnitImages,
  uploadOwnerUnitImages,
  updateOwnerUnitImage
} from './images.actions';

const mapStateToProps = state => ({
  images: state.ownerUnit.images.images,
  isFetching: state.ownerUnit.images.isFetching,
  error: state.ownerUnit.images.error
});
const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerUnitImages: (unitId) => {
      dispatch(updateOwnerUnitImagesStore({ isFetching: true, error: '' }));
      return getOwnerUnitImages(unitId).then((images) => {
        dispatch(updateOwnerUnitImagesStore({ images: images, isFetching: false, error: '' }));
      }).catch((err) => {
        dispatch(updateOwnerUnitImagesStore({ isFetching: false, error: err }));
      });
    },
    updateOwnerUnitImage: (params) => updateOwnerUnitImage(params),
    uploadOwnerUnitImages: (params) => uploadOwnerUnitImages(params),
    deleteOwnerUnitImages: (params) => deleteOwnerUnitImages(params),
    updateOwnerUnitImagesStore: (payload) => dispatch(updateOwnerUnitImagesStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Images));
