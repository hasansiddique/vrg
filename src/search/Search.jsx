import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import queryString from 'query-string';
import moment from 'moment';
import store from 'store';
import PropertyGridItem from './partials/PropertyGridItem.jsx';
import PropertyListItem from './partials/PropertyListItem.jsx';
import DateFilter from './partials/DateFilter.jsx';
import AmenitiesFilter from './partials/AmenitiesFilter.jsx';
import GuestsFilter from './partials/GuestsFilter.jsx';
import BedsAndBathsFilter from './partials/BedsAndBathsFilter.jsx';
import AvreageNightlyRateFilter from './partials/AvreageNightlyRateFilter.jsx';
import FilterValue from './partials/FilterValue.jsx';
import MapComponent from './partials/MapComponent.jsx';
import Pagination from '../common/components/pagination';
import BreadCrumb from '../common/components/breadcrumb';
import Loading from '../common/components/loading';
import {
  flattenObject
} from '../common/utilities';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

export default class Search extends React.Component {
  static get propTypes(){
    return {
      listings: PropTypes.array.isRequired,
      initiateGetSearchListings: PropTypes.func.isRequired,
      drilldown: PropTypes.object,
      isFetching: PropTypes.bool,
      count: PropTypes.number,
      destination: PropTypes.object,
      history: PropTypes.object,
      initiateGetDestination: PropTypes.func.isRequired,
      setFooterVisibility: PropTypes.func.isRequired,
      resetDestination: PropTypes.func.isRequired,
      isMobile: PropTypes.bool,
      error: PropTypes.string,
      full: PropTypes.bool
    };
  }
  static get defaultProps(){
    return {
      isMobile: false,
      full: false
    };
  }
  constructor(props) {
    super(props);
    this.mapZoomLevel = null;
    this.mapBounds = {};
    this.mapCenter = null;
    let params = this.getSearchParamsFromUrl();
    this.state = {
      mapSearch: this.props.full,
      mapHeight: 400,
      showDateFilter: false,
      showAmenities: false,
      showGuests: false,
      showBedsAndBaths: false,
      showAvreageNightlyRateFilter: false,
      selectedListing: null,
      showInfoBox: false,
      startDate: null,
      endDate: null,
      focusedInput: null,
      searchViewType: 'grid',
      hoveredPropertyId: null,
      filters: params
    };
    this.page = 0;
    this.limit = 18;
    this.updateAmenitiesFilter = this.updateAmenitiesFilter.bind(this);
    this.updateLocationsFilter = this.updateLocationsFilter.bind(this);
    this.updateDatesFilter = this.updateDatesFilter.bind(this);
    this.updateRoomsFilter = this.updateRoomsFilter.bind(this);
    this.updateRatesFilter = this.updateRatesFilter.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.setSelectedListing = this.setSelectedListing.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onMapChanged = this.onMapChanged.bind(this);
    this.setHoveredProperty = this.setHoveredProperty.bind(this);
    this.setSearchViewType = this.setSearchViewType.bind(this);
    this.updateMapHeight = this.updateMapHeight.bind(this);
    this.updateGuestsFilter = this.updateGuestsFilter.bind(this);
  }
  componentWillMount(){
    let { isMobile, full } = this.props;
    this.props.setFooterVisibility(false);
    if(this.state.mapSearch){
      this.limit = 18;
    }
    this.setMapType();
    this.setSearchViewType((store.get('searchViewType') == 'list' && this.props.isMobile === false) ? 'list' : 'grid');
    /*if(isMobile && full){
      window.addEventListener('orientationchange', this.updateMapHeight, false);
    }*/
  }
  componentDidMount(){
    this.updateMapHeight();
    this.getDestination();
  }
  componentWillReceiveProps(newProps){
    let oldProps = this.props;
    let loadResults = false;
    if(!oldProps.destination.id && newProps.destination.id){
      loadResults = true;
      this.updateUrlDestination(newProps);
    }else if(oldProps.destination.id != newProps.destination.id){
      loadResults = true;
      this.updateUrlDestination(newProps);
    }
    if(loadResults){
      this.getSearchResults(newProps.destination, this.page);
    }
    if(newProps.searchedLocation && oldProps.searchedLocation){
      if(newProps.searchedLocation.label != oldProps.searchedLocation.label){
        this.props.resetDestination();
        this.getDestination(newProps.searchedLocation.label, true);
      }
    }
    if(newProps.destination.zoomLevel && !this.props.destination.zoomLevel){
      if(!this.mapZoomLevel){
        this.mapZoomLevel = newProps.destination.zoomLevel;
      }
    }
  }
  componentWillUnmount(){
    let { isMobile, full } = this.props;
    this.props.setFooterVisibility(true);
    this.props.resetDestination();
    /*if(isMobile && full){
      window.removeEventListener('orientationchange', this.updateMapHeight, false);
    }*/
  }
  setMapType(){
    let params = queryString.parse(this.props.history.search);
    if(params.map == 'full'){
      this.setState({
        mapSearch: true
      });
    }
  }
  getSearchParamsFromUrl(){
    let query = queryString.parse(this.props.location.search);
    let params = {
      amenities: {},
      locations: {},
      dates: {},
      rooms: {},
      rates: {},
      totalGuests: {}
    };
    if(params.guests) params.guests = query.guests;
    // set up amenities
    if(query.swimming_pool) params.amenities.swimming_pool = query.swimming_pool;
    if(query.balcony) params.amenities.balcony = query.balcony;
    if(query.wifi) params.amenities.wifi = query.wifi;
    if(query.laundary) params.amenities.laundary = query.laundary;
    if(query.pets) params.amenities.pets = query.pets;
    if(query.hot_tub) params.amenities.hot_tub = query.hot_tub;
    if(query.tv_in_bedroom) params.amenities.tv_in_bedroom = query.tv_in_bedroom;
    // set up locations
    if(query.beachfront) params.locations.beachfront = query.beachfront;
    if(query.beachview) params.locations.beachview = query.beachview;
    if(query.waterfront) params.locations.waterfront = query.waterfront;
    if(query.waterview) params.locations.waterview = query.waterview;
    // set up dates
    if(query.checkInDate) params.dates.DateCheckIn = moment(query.checkInDate).format('MM/DD/YYYY');
    if(query.checkOutDate) params.dates.DateCheckOut = moment(query.checkOutDate).format('MM/DD/YYYY');
    // set up rates
    if(query.price_min) params.rates.price_min = query.price_min;
    if(query.price_max) params.rates.price_max = query.price_max;
    // guests
    if(query.adults_min) params.totalGuests.adults_min = parseInt(query.adults_min);
    if(query.children_min) params.totalGuests.children_min = parseInt(query.children_min);
    // set up rooms
    if(query.bedroom_min) params.rooms.bedroom_min = parseInt(query.bedroom_min);
    if(query.baths_min) params.rooms.baths_min = parseInt(query.baths_min);

    if(query.NorthEast_lat && query.NorthEast_lng && query.SouthWest_lat && query.NorthEast_lng){
      this.mapBounds = {
        NorthEast_lat: query.NorthEast_lat,
        NorthEast_lng: query.NorthEast_lng,
        SouthWest_lat: query.SouthWest_lat,
        SouthWest_lng: query.SouthWest_lng
      };
    }
    if(query.mapZoomLevel){
      this.mapZoomLevel = parseInt(query.mapZoomLevel);
    }
    return params;
  }
  setSearchParamsToUrl(params){
    let { history } = this.props;
    let parsedQuery = queryString.parse(history.location.search);
    let ourParams = Object.assign({}, params);
    ourParams.checkInDate = params.DateCheckIn;
    ourParams.checkOutDate = params.DateCheckOut;
    if(this.mapBounds){
      ourParams = Object.assign({}, this.mapBounds, ourParams);
    }
    ourParams.query = parsedQuery.query;
    if(this.mapZoomLevel) ourParams.mapZoomLevel = this.mapZoomLevel;
    delete ourParams.DateCheckIn;
    delete ourParams.DateCheckOut;

    let query = queryString.stringify(ourParams);
    history.push({
      pathname: history.location.pathname,
      search: query
    });
  }
  updateUrlDestination(newProps){
    let drillDown = newProps.destination.drilldown;
    if(drillDown){
      let { history, full } = this.props;
      let destinationUrlName = drillDown.toLowerCase().replace(/\s/ig, '-');
      let basePath = (full) ? 'map-search' : 'search';
      let regex = new RegExp('/' + basePath + '.*$', 'ig');
      let newUrl = history.location.pathname.replace(regex, `/${basePath}/${destinationUrlName}`);
      let search = history.location.search;
      if(newUrl != history.location.pathname){
        this.mapBounds = null;
        this.mapZoomLevel = null;
        history.push({
          pathname: newUrl,
          search: search
        });
      }
    }
  }
  getDestination(path, reset = false){
    let type = 2;
    let { full } = this.props;
    if(!path){
      let urlParams = queryString.parse(this.props.history.location.search);
      if(urlParams.query){
        path = urlParams.query;
      }else{
        if(full){
          path = this.props.location.pathname.replace(/\/map-search/ig, '').replace(/-/ig, ' ');
        }else{
          path = this.props.location.pathname.replace(/\/search/ig, '').replace(/-/ig, ' ');
        }
        type = 1;
      }
    }
    if(!path){
      path = 'clearwater beach, florida, united states';
      type = 2;
    }
    this.props.initiateGetDestination(path, type);
  }
  getSearchResults(destination, page = 0){
    destination = destination || this.props.destination;
    let mapBounds = this.mapBounds;
    let { isFetching, full, listings } = this.props;
    let searchFilters = flattenObject(this.state.filters);
    this.setSearchParamsToUrl(searchFilters);
    if(this.state.selectedListing){
      return false;
    }
    if(destination && destination.id && isFetching === false){
      this.page = page;
      let { initiateGetSearchListings, listings } = this.props;
      let limit = this.limit;
      let offset = ((page) * limit) + 1;
      let params = {
        gid: destination.id,
        pageSize: limit,
        startRow: offset,
        mapZoomLevel: this.mapZoomLevel || destination.zoomLevel
      };
      params = Object.assign({}, params, mapBounds, searchFilters);
      let reset = (full === true && this.page > 0 && listings && listings.length > 0) ? false : true;
      initiateGetSearchListings(params, reset);
    }
  }
  updateMapHeight(){
    let { isMobile, full } = this.props;
    let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    let height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    this.setState({
      mapHeight: height - ((isMobile) ? 168 : 120)
    });
  }
  setSelectedListing(listing = null, cb = null){
    this.setState({
      selectedListing: listing
    }, () => {
      if(cb){
        cb.call();
      }
    });
  }

  updateFilter(key, value){
    let { filters } = this.state;
    filters[key] = value;
    this.updateFilters(filters);
  }

  updateFilters(filters = {}){
    let state = this.state;
    let newFilters = Object.assign({}, this.state.filters, filters);
    state.filters = newFilters;
    this.setState(state, () => {
      this.page = 0;
      this.getSearchResults();
    });
  }
  updateAmenitiesFilter(value){
    this.updateFilter('amenities', value);
  }
  updateDatesFilter(value){
    this.updateFilter('dates', value);
  }
  updateLocationsFilter(value){
    this.updateFilter('locations', value);
  }
  updateRoomsFilter(value){
    this.updateFilter('rooms', value);
  }
  updateGuestsFilter(filters){
    // console.log(filters);
    let guests = 0;
    for (let key in filters){
      guests += parseInt(filters[key]);
    }
    this.updateFilter('totalGuests', filters);
    this.updateFilter('guests', guests);
  }
  updateRatesFilter(value){
    this.updateFilter('rates', value);
  }
  changeModalState(name, modalState){
    let state = this.state;
    state[name] = modalState;
    this.setState(state);
  }
  clearFilter(key, key1 = null){
    let filters = this.state.filters;
    if(typeof filters[key] == 'object'){
      if(key1){
        if(filters[key][key1]){
          delete filters[key][key1];
        }
      }
    }else{
      delete filters[key];
    }
    this.setState({
      filters: filters
    });
  }
  handlePageClick(data){
    window.scrollTo(0, 0);
    this.getSearchResults(this.props.destination, data.selected);
  }
  onMapChanged(map){
    let bounds = map.getBounds();
    this.mapZoomLevel = map.getZoom();
    let northEast = bounds.getNorthEast();
    let southWest = bounds.getSouthWest();
    // let paddedBounds = {
    //   NorthEast_lat: (northEast.lat() - (northEast.lat()/(200*this.mapZoomLevel))*1),
    //   NorthEast_lng: (northEast.lng() - (northEast.lng()/(200*this.mapZoomLevel))*1),
    //   SouthWest_lat: (southWest.lat() + (southWest.lat()/(200*this.mapZoomLevel))*1),
    //   SouthWest_lng: (southWest.lng() + (southWest.lng()/(200*this.mapZoomLevel))*1)
    // };
    let mapBounds = {
      NorthEast_lat: northEast.lat(),
      NorthEast_lng: northEast.lng(),
      SouthWest_lat: southWest.lat(),
      SouthWest_lng: southWest.lng()
    };
    // console.log(paddedBounds, mapBounds);
    this.mapBounds = mapBounds;
    this.mapCenter = map.getCenter();
    this.page = 0;
    this.getSearchResults(this.props.destination, this.page);
  }
  setHoveredProperty(state = null){
    this.setState({
      hoveredPropertyId: state
    });
  }
  setSearchViewType(type){
    this.setState({
      searchViewType: type
    });
    store.set('searchViewType', type);
  }
  render() {
    let { mapHeight, filters, selectedListing, searchViewType } = this.state;
    let { locations, amenities, dates, rooms, rates, totalGuests } = filters;
    let { listings, isFetching, destination, count, isMobile, error } = this.props;
    if(destination.isFetching || !destination.id){
      return (
        <Loading loading style={{ margin: '80px auto' }} />
      );
    }
    let pageCount = Math.ceil(count/this.limit);
    if(!this.mapZoomLevel){
      this.mapZoomLevel = destination.zoomLevel;
    }
    return (
      <div className="search-page">
        <div className="filters">
          <ul>
            <li>
              <DateFilter
                filters={Object.assign({}, dates)}
                updateFilter={this.updateDatesFilter}
                show={this.state.showDateFilter}
                isMobile={isMobile}
                onClick={() => this.changeModalState('showDateFilter', true)}
                closeModal={() => this.changeModalState('showDateFilter', false)}
              />
            </li>
            <li>
              <GuestsFilter
                filters={Object.assign({}, totalGuests)}
                updateFilter={this.updateGuestsFilter}
                show={this.state.showGuests}
                onClick={() => this.changeModalState('showGuests', true)}
                closeModal={() => this.changeModalState('showGuests', false)}
              />
            </li>
            <li>
              <AmenitiesFilter
                filters={Object.assign({}, amenities)}
                updateFilter={this.updateAmenitiesFilter}
                show={this.state.showAmenities}
                onClick={() => this.changeModalState('showAmenities', true)}
                closeModal={() => this.changeModalState('showAmenities', false)}
              />
            </li>
            <li>
              <BedsAndBathsFilter
                filters={Object.assign({}, rooms)}
                updateFilter={this.updateRoomsFilter}
                show={this.state.showBedsAndBaths}
                onClick={() => this.changeModalState('showBedsAndBaths', true)}
                closeModal={() => this.changeModalState('showBedsAndBaths', false)}
              />
            </li>
            <li>
              <AvreageNightlyRateFilter
                filters={Object.assign({}, rates)}
                updateFilter={this.updateRatesFilter}
                show={this.state.showAvreageNightlyRateFilter}
                onClick={() => this.changeModalState('showAvreageNightlyRateFilter', true)}
                closeModal={() => this.changeModalState('showAvreageNightlyRateFilter', false)}
              />
            </li>
          </ul>
        </div>
        <div className="" style={{  }}>
          {(() => {
            if(this.state.mapSearch){
              return (
                <div className="full-map-container">
                  {(() => {
                    if(isFetching){
                      return (
                        <div className="full-map-loading">
                          <Loading loading />
                        </div>
                      );
                    }else if(error){
                      return (
                        <div className="search-error">
                          {error}
                        </div>
                      );
                    }
                  })()}
                  {(() => {
                    if(destination && destination.id){
                      let mapContainer = (<div style={{ height: `${mapHeight}px` }} />);
                      let mapElement = (<div style={{ height: `${mapHeight}px` }} />);
                      return (
                        <div className="map-container" ref="mapContainer">
                          <div ref="map" className="map">
                            <MapComponent
                              center={(destination.lat ? {lat: destination.lat, lng: destination.lng} : {})}
                              zoom={this.mapZoomLevel}
                              listings={listings}
                              containerElement={mapContainer}
                              mapElement={mapElement}
                              setSelectedListing={this.setSelectedListing}
                              selectedListing={selectedListing}
                              onMapChanged={this.onMapChanged}
                              // onZoomChange={this.onZoomChange}
                              page={this.page}
                              isMobile={isMobile}
                              hoveredPropertyId={this.state.hoveredPropertyId}
                            />
                          </div>
                          {(() => {
                            if(count > 0){
                              return (
                                <div className="full-map-pagination">
                                  <div className="clearfix">
                                    {(() => {
                                      if(listings.length < count && isFetching === false){
                                        return (
                                          <button className="load-more" onClick={() => this.handlePageClick({ selected: this.page + 1})}>
                                            Load More
                                          </button>
                                        );
                                      }else{
                                        return (
                                          <button disabled className="load-more">
                                            Load More
                                          </button>
                                        );
                                      }
                                    })()}
                                  </div>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      );
                    }
                  })()}
                </div>
              );
            }else{
              return (
                <div>
                  <div className="container-fluid" style={{  }}>
                    <div className="property-listings-container">
                      <div className="row">
                        <div className="col-sm-12 col-md-8 list no-padding-lg">
                          <div className="clearfix">
                            <div className="pull-left">
                              <div className="featured-properties-heading">
                                {(() => {
                                  if(count > 0){
                                    if(this.mapZoomLevel < 10){
                                      return (
                                        <h3><i className="glyphicon glyphicon-star"/> {count} Featured Properties</h3>
                                      );
                                    }else{
                                      return(
                                        <h3>{count} Properties</h3>
                                      );
                                    }
                                  }
                                })()}
                              </div>
                            </div>
                            <div className="pull-right">
                              <div className="view-menu">
                                {(() => {
                                  if(!isMobile){
                                    return (
                                      <Fragment>
                                        <a
                                          href="javascript:;"
                                          className={(searchViewType == 'grid' ? 'active' : '')}
                                          onClick={() => this.setSearchViewType('grid')}>
                                          <i className="glyphicon glyphicon-th"></i> Grid
                                        </a>
                                        <a
                                          href="javascript:;"
                                          className={(searchViewType == 'list' ? 'active' : '')}
                                          onClick={() => this.setSearchViewType('list')}>
                                          <i className="glyphicon glyphicon-th-list"></i> List
                                        </a>
                                      </Fragment>
                                    );
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                          <div className="listings" style={{ minHeight: `${mapHeight - 156}px` }}>
                            {(() => {
                              if(isFetching){
                                return (
                                  <Loading loading />
                                );
                              }else{
                                return (
                                  <div>
                                    <div className="row" style={{ marginRight: '-10px' }}>
                                      {listings.map((listing, index) => {
                                        if(searchViewType == 'grid'){
                                          return (
                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
                                              <PropertyGridItem listing={listing} index={index} setHoveredProperty={this.setHoveredProperty} />
                                            </div>
                                          );
                                        }else{
                                          return (
                                            <div className="col-xs-12" key={index}>
                                              <PropertyListItem listing={listing} index={index} setHoveredProperty={this.setHoveredProperty} />
                                            </div>
                                          );
                                        }
                                      })}
                                    </div>
                                    {(() => {
                                      if(listings && listings.length){
                                        return (
                                          <div className="">
                                            <div className="clearfix">
                                              <Pagination
                                                handlePageClick={this.handlePageClick}
                                                pageRangeDisplayed={2}
                                                marginPagesDisplayed={1}
                                                pageCount={pageCount}
                                                forcePage={this.page} />
                                            </div>
                                          </div>
                                        );
                                      }else{
                                        return (
                                          <div>
                                            <div className="no-results">
                                              {(() => {
                                                if(error){
                                                  return (
                                                    <h2 className="error">{error}</h2>
                                                  );
                                                }else{
                                                  return (
                                                    <h2>No Results Found</h2>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                );
                              }
                            })()}
                          </div>
                          {(() => {
                            if(destination && destination.drilldown && !isMobile){
                              return (
                                <BreadCrumb path={destination.drilldown} />
                              );
                            }
                          })()}
                        </div>
                      </div>
                      <div className="row">
                        {(() => {
                          if(!isMobile && destination && destination.id){
                            let mapContainer = (<div style={{ height: `${mapHeight}px` }} />);
                            let mapElement = (<div style={{ height: `100%` }} />);
                            return (
                              <div className="col-sm-4 map-container" ref="mapContainer" style={{ height: `${mapHeight}px`, paddingLeft: '0px', paddingRight: '0px' }}>
                                <div ref="map" className="map" style={{ height: `${mapHeight}px` }}>
                                  <MapComponent
                                    center={(destination.lat ? {lat: destination.lat, lng: destination.lng} : {})}
                                    zoom={this.mapZoomLevel}
                                    listings={listings}
                                    containerElement={mapContainer}
                                    mapElement={mapElement}
                                    setSelectedListing={this.setSelectedListing}
                                    selectedListing={selectedListing}
                                    onMapChanged={this.onMapChanged}
                                    onZoomChange={this.onZoomChange}
                                    page={this.page}
                                    hoveredPropertyId={this.state.hoveredPropertyId}
                                  />
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                  {(() => {
                    if(destination && destination.drilldown && isMobile){
                      return (
                        <BreadCrumb path={destination.drilldown} />
                      );
                    }
                  })()}
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}
