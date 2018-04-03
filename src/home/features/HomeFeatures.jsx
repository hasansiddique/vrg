import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import mapSearch from '../../theme-assets/images/map-search.png';
import specials from '../../theme-assets/images/specials.png';
import topDestinations from '../../theme-assets/images/top-destinations.png';
import listingProperty from '../../theme-assets/images/list-your-property.png';

class HomeFeatures extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="proj mar-bot-red-m30">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-10 col-xs-offset-1 col-sm-offset-0">
              <Link to={`/list-your-property`}>
                <div className="hom-pro">
                  <img src={listingProperty} alt=""/>
                  <h4>List Your Property</h4>
                  <p>Register and advertise your vacation rentals with VRguest</p>
                  <button>Explore Now</button>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-10 col-xs-offset-1 col-sm-offset-0">
              <Link to={`/top-destinations`}>
                <div className="hom-pro">
                  <img src={mapSearch} alt="Top Destinations"/>
                  <h4>Top Destinations</h4>
                  <p>Explore properties in currently high in demand destinations</p>
                  <button>Explore Now</button>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-10 col-xs-offset-1 col-sm-offset-0">
              <Link to={`/vacation-rental-deals`}>
                <div className="hom-pro">
                  <img src={specials} alt="Specials"/>
                  <h4>Specials</h4>
                  <p>Explore special discounted offers by Property managers and book your stay</p>
                  <button>Explore Now</button>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-10 col-xs-offset-1 col-sm-offset-0">
              <Link to={`/map-search`}>
                <div className="hom-pro">
                  <img src={topDestinations} alt=""/>
                  <h4>Map Search</h4>
                  <p>Search Vacation rentals in your favourite destination on the map</p>
                  <button>Explore Now</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomeFeatures;
