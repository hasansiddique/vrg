import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GoogleMap from '../../common/components/GoogleMap';
import {getImageSet} from "../../common/utilities";

class PropertyLocation extends Component {
  constructor() {
    super();

    this.state = {
      infoOpen: true,
    };

    this.toggleInfoOpen = this.toggleInfoOpen.bind(this);
  }

  toggleInfoOpen() {
    this.setState({infoOpen: !this.state.infoOpen});
  }

  render() {
    const {isFetching, detailsInfo, images, listingId} = this.props;

    let imageUrl = images && images[0] && `http://s3.amazonaws.com/vrguest-assets/properties/units/small/${getImageSet(listingId)}/${listingId}/${images[0].imageName}`;

    return (
      <div className="pglist-p3 pglist-bg pglist-p-com" id="property-location">
        <div className="pglist-p-com-ti">
          <h3><span>Property Location</span></h3></div>
        <div className="list-pg-inn-sp list-360">
          {!isFetching && (
            <GoogleMap
              image={imageUrl}
              detailsInfo={detailsInfo}
              isMarkerShown
              infoOpen={this.state.infoOpen}
              onToggleOpen={this.toggleInfoOpen}
              draggable={false}
              defaultZoom={15}
              location={{lat: detailsInfo.lat, lng: detailsInfo.lng}}/>
          )}
        </div>
      </div>
    );
  }
}

PropertyLocation.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  detailsInfo: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  listingId: PropTypes.number.isRequired,
};

PropertyLocation.defaultProps = {
  images: []
};

export default PropertyLocation;
