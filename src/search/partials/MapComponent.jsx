import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {GoogleMap, Marker, withScriptjs, withGoogleMap} from "react-google-maps";
import PropertyGridItem from './PropertyGridItem.jsx';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

export default class MapComponent extends React.Component {
  constructor(props){
    super(props);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.map = null;
    this.mapRendered = false;
    this.mapCenter = null;
    this.zoom = null;
    this.setGoogleMap();
  }
  componentDidMount(){
    this.mapCenter = this.props.center;
    this.setGoogleMap();
  }
  setGoogleMap(){
    this.GoogleMapComponent = withScriptjs(withGoogleMap((props) => {
      let { page, listings, center, zoom, hoveredPropertyId, isMobile } = props;
      let dynamicProps = {};
      if(page > 0 && listings.length){
        // dynamicProps.center = {lat: listings[0].lat, lng: listings[0].lng};
        dynamicProps.defaultCenter = (this.mapCenter) ? this.mapCenter : center;
      }else{
        dynamicProps.defaultCenter = (this.mapCenter) ? this.mapCenter : center;
      }
      let infoBoxClearance = new window.google.maps.Size((isMobile ? 68 : 100), (isMobile ? 68 : 100));
      let pixelOffset = new window.google.maps.Size((isMobile ? -100 : -120), 25);
      let infoBoxStyles = {
        width: (isMobile ? '240px' : '280px'),
        'position': 'relative',
        fontSize: (isMobile ? '1.2em' : '1.4em')
      };
      return (
        <GoogleMap
          ref={(ref) => { this.map = ref; }}
          defaultDraggable={props.draggable}
          defaultOptions={{
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            mapTypeId: 'terrain',
            scrollwheel: false,
            clickableIcons: false,
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_TOP
            }
          }}
          zoom={zoom}
          {...dynamicProps}
          onDragEnd={this.onBoundsChanged}
          onZoomChanged={this.onBoundsChanged}
          >
          {(() => {
            if(props.selectedListing){
              return (
                <InfoBox
                  position={new window.google.maps.LatLng(props.selectedListing.lat, props.selectedListing.lng)}
                  options={{
                    closeBoxURL: ``,
                    enableEventPropagation: true,
                    infoBoxClearance: infoBoxClearance,
                    pixelOffset: pixelOffset,
                    alignBottom: true,
                    disableAutoPan: false,
                    zIndex: 1111
                  }}
                >
                  <div style={infoBoxStyles}>
                    <a
                      href="javascript:;"
                      onClick={() => { (props.selectedListing) ? props.setSelectedListing(null) : null; } }
                      className="listing-close-button"><span className="glyphicon glyphicon-remove"></span></a>
                    <PropertyGridItem listing={props.selectedListing} resize={true} />
                  </div>
                </InfoBox>
              );
            }
          })()}
          {listings.map((listing, index) => {
            let className = 'marker-container' + (hoveredPropertyId == listing.unitId ? '' : '');
            let boxClass = 'infoBox' + (hoveredPropertyId == listing.unitId ? ' hovered' : '');
            return (
              /*<Marker
                key={index}
                position={{ lat: listing.lat, lng: listing.lng }}
                place={listing.unitBuildingName}
                animation={google.maps.Animation.DROP}
                onClick={() => props.setSelectedListing(null, props.setSelectedListing.bind(this, listing))}
              />*/
              <InfoBox
                  key={index}
                  position={new window.google.maps.LatLng(listing.lat, listing.lng)}
                  options={{
                    closeBoxURL: ``,
                    enableEventPropagation: true,
                    boxClass: boxClass,
                    disableAutoPan: true
                  }}
                >
                  <div
                    className={className}
                    onClick={() => props.setSelectedListing(null, () => props.setSelectedListing(listing))}>
                    <div className="map-marker">
                      <span>${parseInt(listing.avgNightlyRate)}</span>
                    </div>
                  </div>
                </InfoBox>
            );
          })}
        </GoogleMap>
      );
    })
    );
  }
  onBoundsChanged(){
    this.zoom = this.map.getZoom();
    let center = this.map.getCenter();
    this.mapCenter = { lat: center.lat(), lng: center.lng() };
    this.props.onMapChanged(this.map);
  }
  render(){
    let mapProps = {
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAldqwfF3EANaOAKyuMLN2P6R0BLmqZnC4",
      loadingElement: <div style={{height: `100%`}}/>,
      containerElement: this.props.containerElement,
      mapElement: this.props.mapElement
    };
    mapProps = Object.assign({}, mapProps, this.props);
    return (
      <this.GoogleMapComponent {...mapProps} {...this.props} />
    );
  }
}


MapComponent.propTypes = {
  zoom: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
  selectedListing: PropTypes.object,
  setSelectedListing: PropTypes.func.isRequired,
  listings: PropTypes.array.isRequired,
  destination: PropTypes.object,
  mapContainer: PropTypes.object,
  mapElement: PropTypes.object,
  onMapChanged: PropTypes.func,
  onZoomChange: PropTypes.func
};

MapComponent.defaultProps = {
  onMapChanged: () => {}
};
