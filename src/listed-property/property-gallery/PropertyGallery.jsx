import {get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';

import CarousalSlider from '../../common/components/carousal';
import {getImageSet} from '../../common/utilities';

class ListedProperty extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {listingId} = this.props;
    this.props.initiateGetUnitImages({'unit_id': listingId});
  }

  transformImages(images, listingId) {
    let transformedImages = [];
    images.forEach((image) => {
      let abc = {
        src: `http://s3.amazonaws.com/vrguest-assets/properties/units/large/${getImageSet(listingId)}/${listingId}/${image.imageName}`,
        alt: image.iamgedId,
        description: image.imageTitle ? image.imageTitle : ''
      };
      transformedImages.push(abc);
    });

    return transformedImages;
  }

  render() {
    const {imagesInfo, listingId, isFetching} = this.props;
    let images = get(imagesInfo, 'images') && this.transformImages(get(imagesInfo, 'images'), listingId);

    return (
      <div className="pglist-p3 pglist-bg pglist-p-com" id="property-gallery">
        <div className="list-pg-inn-sp">

          {isFetching ?
            <div className="spinner-wrapper">
              <BeatLoader
                color={'#0074E1'}
                loading={isFetching}
              />
              <span>Loading...</span>
            </div>
            :
            images && (
              <CarousalSlider
                items={images}
                settings={{
                  autoPlay: true,
                  emulateTouch: true,
                  infiniteLoop: true,
                  showThumbs: true,
                  thumbWidth: 150,
                  showIndicators: false
                }}
              />
            )}
        </div>
      </div>
    );
  }
}

ListedProperty.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  listingId: PropTypes.number.isRequired,
  imagesInfo: PropTypes.object,
  initiateGetUnitImages: PropTypes.func.isRequired,
};

export default ListedProperty;
