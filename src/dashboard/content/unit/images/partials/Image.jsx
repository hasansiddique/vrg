import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getImageSet} from '../../../../../common/utilities';

export default class Image extends React.Component {
  static get propTypes() {
    return {
      image: PropTypes.object,
      index: PropTypes.number.isRequired,
      unitId: PropTypes.number.isRequired,
      baseUrlPath: PropTypes.string.isRequired,
      deleteImage: PropTypes.func.isRequired,
      updateImage: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    let { image } = props;
    this.state = {
      image_title: image.image_title
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.imageSet = null;
  }

  deleteImage() {
    let confirmDelete = confirm('Are You Sure');
    if(confirmDelete === false){
      return false;
    }
    let {image, index, deleteImage} = this.props;
    deleteImage(image, index);
  }

  onTitleChange(e){
    this.setState({
      image_title: e.target.value
    });
  }

  updateImage(e){
    let { image, index, updateImage } = this.props;
    if(image.image_title != this.state.image_title){
      image.image_title = this.state.image_title;
      updateImage(image, index);
    }
  }

  render() {
    let {image, index, baseUrlPath, unitId} = this.props;
    if (!image) {
      return (
        <div>No Iimage</div>
      );
    }
    if (!this.imageSet) {
      this.imageSet = getImageSet(unitId);
    }
    let url = `http://s3.amazonaws.com/vrguest-assets/properties/units/large/${this.imageSet}/${unitId}/${image.image_name}`;
    if (image.dataUrl) {
      url = image.dataUrl;
    }

    return (
      <div className="single-image">
        <div className="clearfix">
          <div className="image-container">
            <img src={url} alt=""/>
          </div>
          {(() => {
            if (image.uploading) {
              return (
                <div className="uploading">Uploading...</div>
              );
            } else if (image.deleting) {
              return (
                <div className="uploading">Deleting...</div>
              );
            } else if(image.updating){
              return (
                <div className="uploading">Updating...</div>
              );
            }
          })()}
          <div className="caption">
            <input 
              type="text" 
              onBlur={this.updateImage}
              onChange={this.onTitleChange}
              className="form-control" 
              value={this.state.image_title}/>
          </div>
          <div className="actions">
            <a
              href="javascript:;"
              className="delete"
              onClick={this.deleteImage}>
              <i className="glyphicon glyphicon-remove"/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
