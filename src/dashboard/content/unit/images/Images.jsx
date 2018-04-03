import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Loading from '../../../../common/components/loading';
import Image from './partials/Image.jsx';

class Images extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: null,
      selecteImageDataUrl: null
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getOwnerUnitImages();
  }

  getOwnerUnitImages() {
    let {images, isFetching, error, getOwnerUnitImages, match} = this.props;
    if (!isFetching) {
      getOwnerUnitImages(match.params.id);
    }
  }

  deleteImage(image, index) {
    let {deleteOwnerUnitImages, match, images, updateOwnerUnitImagesStore, deleting} = this.props;
    if (deleting) return false;
    let unitId = match.params.id;
    let params = {
      image_id: image.image_id,
      unit_id: unitId
    };
    image.deleting = true;
    images[index] = image;
    updateOwnerUnitImagesStore({
      images: [...images]
    });
    deleteOwnerUnitImages(params).then((res) => {
      if (res.status == false && res.errmsgs.length) {
        image.deleting = false;
        images[index] = image;
        updateOwnerUnitImagesStore({
          images: [...images]
        });
        alert('Error Occured While Deleting Image');
      } else {
        images = images.filter((img) => img.image_id != image.image_id);
        // console.log(images);
        updateOwnerUnitImagesStore({
          images: images,
        });
      }
    }).catch(() => {
      image.deleting = false;
      images[index] = image;
      updateOwnerUnitImagesStore({
        images: [...images]
      });
    });
  }

  selectImage() {
    let {updateOwnerUnitImagesStore, images, uploadOwnerUnitImages, match} = this.props;
    let unitId = match.params.id;
    let input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = (e) => {
      let files = e.target.files;
      if (files && files.length) {
        let file = files[0];
        let reader = new FileReader;
        reader.onload = (e) => {
          this.setState({
            selecteImageDataUrl: e.target.result,
            selectedImage: file
          });
          let index = images.length;
          let name = file.name.replace(/\.[^/.]+$/, "");
          updateOwnerUnitImagesStore({
            images: [...images, {
              id: 0,
              dataUrl: e.target.result,
              image_title: name,
              image_name: name,
              default_status: 0,
              image_order: 0,
              uploading: true
            }]
          });
          // now initiate upload
          let params = {
            unit_id: unitId,
            image: file,
            image_title: name
          };
          uploadOwnerUnitImages(params).then((image) => {
            // console.log(image);
            images.push(image);
            updateOwnerUnitImagesStore({
              images: [...images]
            });
          }).catch(() => {
            alert('Image Upload Failed');
            updateOwnerUnitImagesStore({
              images: [...images]
            });
          });
        };
        reader.readAsDataURL(file);
      }
    };
  }

  updateImage(image, index) {
    let {updateOwnerUnitImage, match, images, updateOwnerUnitImagesStore} = this.props;
    let unitId = match.params.id;
    let params = Object.assign({}, image, {
      unit_id: unitId
    });
    image.updating = true;
    images[index] = image;
    updateOwnerUnitImagesStore({
      images: [...images]
    });
    updateOwnerUnitImage(params).then((res) => {
      if (res.status == false) {
        image.updating = false;
        images[index] = image;
        updateOwnerUnitImagesStore({
          images: [...images]
        });
        alert('Unable to update Image');
      }else{
        image.updating = false;
        images[index] = image;
        updateOwnerUnitImagesStore({
          images: [...images],
        });
      }
    }).catch((err) => {
      image.updating = false;
      images[index] = image;
      updateOwnerUnitImagesStore({
        images: [...images]
      });
    });
  }

  render() {
    let {images, isFetching, error, history, deleting, match} = this.props;
    let unitId = match.params.id;
    let {imageNumbers} = this.state;
    let baseUrlPath = history.location.pathname;
    return (
      <div>
        <div className="">
          {(() => {
            if (isFetching || !images) {
              return (
                <Loading loading/>
              );
            } else {
              return (
                <div>
                  <div className="unit-images">
                    <div className="row">
                      {images.map((image, index) => {
                        return (
                          <div className="col-sm-3" key={index}>
                            <Image
                              image={image}
                              index={index}
                              deleting={deleting}
                              baseUrlPath={baseUrlPath}
                              deleteImage={this.deleteImage}
                              updateImage={this.updateImage}
                              unitId={parseInt(unitId)}
                            />
                          </div>
                        );
                      })}
                      {(() => {
                        if(images.length == 0){
                          return (
                            <div className="col-sm-12">
                              <div className="well well-md">
                                <div>This Unit does not have images yet. Please click the plus (+) button below to upload images!</div>
                              </div>
                            </div>
                          );
                        }
                      })()}
                      <div className="col-sm-3">
                        <div className="single-image" onClick={this.selectImage}>
                          <div className="text-center">
                            <div className="add-image">
                              <i className="glyphicon glyphicon-plus"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

Images.propTypes = {
  getOwnerUnitImages: PropTypes.func,
  updateOwnerUnitImages: PropTypes.func,
  updateOwnerUnitImage: PropTypes.func,
  images: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  match: PropTypes.object,
  deleteOwnerUnitImages: PropTypes.func,
  uploadOwnerUnitImages: PropTypes.func,
  history: PropTypes.object,
  updateOwnerUnitImagesStore: PropTypes.func,
  deleting: PropTypes.number
};

export default Images;
