import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
import CarousalSlider from '../../common/components/carousal';
import { getImageSet } from '../../common/utilities';

export default class PropertyListItem extends React.PureComponent {
  static get propTypes(){
    return {
      listing: PropTypes.object.isRequired,
      setHoveredProperty: PropTypes.func
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
        src: `http://s3.amazonaws.com/vrguest-assets/properties/units/large/${set}/${listing.unitId}/${val}`,
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
    let { listing } = this.props;
    return (
      <div className="property-list-item" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {(() => {
          if(listing.featured == 1){
            return (
              <div className="featured"><i className="fa fa-star"></i></div>
            );
          }
        })()}
        <div className="row">
          <div className="col-sm-4 photos-container">
            <div>
              <CarousalSlider
                items={photos}
                settings={{
                  autoPlay: true, 
                  infiniteLoop: true, 
                  showThumbs: false, 
                  dots: true
                }}
              />
            </div>
          </div>
          <div className="col-sm-8 info-container">
            <div className="wrapper">
              <div className="info">
                <h2 className="title">
                  <NavLink to={`/listings/${listing.unitId}`}>{listing.unitBuildingName}</NavLink>
                </h2>
                <div className="stats">
                  <span><i className="fa fa-hdd-o" /> {listing.rooms} Bed</span>
                  <span><i className="fa fa-male" /> {listing.baths} Bath</span>
                  <span><i className="fa fa-bed" /> {listing.maxGuests} Sleeps</span>
                </div>
                <h4 className="price">Average Nightly Rate <span>${listing.avgNightlyRate}</span></h4>
                <h4 className="price"><small>{listing.headline}</small></h4>
                <div>
                  {(listing.unitType) ? (<span className="unit-type">{listing.unitType}</span>) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
