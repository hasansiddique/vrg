import {get} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap} from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAldqwfF3EANaOAKyuMLN2P6R0BLmqZnC4",
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultDraggable={props.draggable}
      defaultZoom={props.defaultZoom}
      defaultCenter={props.location}>
      {props.isMarkerShown && (
        <Marker position={props.location} onClick={props.onToggleOpen}>
          {props.infoOpen && (
            <InfoWindow
              defaultPosition={new window.google.maps.LatLng(props.location.lat, props.location.lng)}
              onCloseClick={props.onToggleOpen}
              style={{overflow: 'hidden'}}
              options={{closeBoxURL: ``, enableEventPropagation: true}}
            >
              <div style={{maxWidth: '300px'}}>
                <div className="col-xs-4">
                  <img src={props.image} alt="" width={90}/>
                </div>
                <div className="col-xs-8">
                  <b>{props.detailsInfo && props.detailsInfo.headline}</b>
                </div>
                <div className="col-xs-12" style={{paddingTop: '10px'}}>
                  {`${get(props.detailsInfo, 'streetAddress')}, ${get(props.detailsInfo, 'city')}, ${get(props.detailsInfo, 'state')}, ${get(props.detailsInfo, 'country')}`}
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      )}
    </GoogleMap>
  );
});

MapComponent.propTypes = {
  location: PropTypes.object.isRequired,
  isMarkerShown: PropTypes.bool.isRequired,
  defaultZoom: PropTypes.number.isRequired,
};

export default MapComponent;
