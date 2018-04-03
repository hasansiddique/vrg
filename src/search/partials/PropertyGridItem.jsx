import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
import CarousalSlider from '../../common/components/carousal/Carousal.jsx';
import { getImageSet } from '../../common/utilities';
import config from '../../config';

export default class PropertyGridItem extends React.Component {
  static get propTypes(){
    return {
      listing: PropTypes.object.isRequired,
      resize: PropTypes.bool,
      setHoveredProperty: PropTypes.func
    };
  }
  static get defaultProps(){
    return {
      resize: false
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentWillMount(){
    let { listing } = this.props;
    let set = getImageSet(listing.unitId);
    let photos = listing.images.map(((val, index) => {
      return {
        src: `${config.s3Bucket}properties/units/large/${set}/${listing.unitId}/${val}`,
        alt: index,
        link: `/listings/${listing.unitId}`,
        description: ''
      };
    }));
    this.setState({
      photos: photos
    });
  }

  onMouseEnter(){
    if(this.props.setHoveredProperty){
      this.props.setHoveredProperty(this.props.listing.unitId);
    }
  }

  onMouseLeave(){
    if(this.props.setHoveredProperty){
      this.props.setHoveredProperty(null);
    }
  }

  render() {
    let { photos } = this.state;
    let { listing, resize } = this.props;
    return (
      <div className="property-grid-item" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {(() => {
          if(listing.featured == 1){
            return (
              <div className="featured"><i className="fa fa-star"></i></div>
            );
          }
        })()}
        {(() => {
          if(photos.length){
            return (
              <CarousalSlider
                items={photos}
                forceUpdate={resize}
                settings={{
                  autoPlay: true, 
                  infiniteLoop: true, 
                  showThumbs: false, 
                  dots: true
                }}
              />
            );
          }
        })()}
        <div className="stats">
          <span><i className="fa fa-hdd-o" /> {listing.rooms} Bed</span>
          <span><i className="fa fa-male" /> {listing.baths} Bath</span>
          <span><i className="fa fa-bed" /> {listing.maxGuests} Sleeps</span>
        </div>
        <div className="info">
          <h2 className="title">
            <NavLink to={`/listings/${listing.unitId}`}>{listing.unitBuildingName}</NavLink>
          </h2>
          <h4 className="price">Average Nightly Rate <span>${listing.avgNightlyRate}</span></h4>
          <div>
            {(listing.unitType) ? (<span className="unit-type">{listing.unitType}</span>) : null}
          </div>
        </div>
      </div>
    );
  }
}
