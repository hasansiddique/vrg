import React, {Component} from 'react';
import Scrollspy from 'react-scrollspy';

class ListedBookingNavigation extends Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  render() {
    let items = [
      'property-gallery', 
      'property-details',
      'property-features', 
      'property-location', 
      'property-calendar',
      'property-reviews'
    ];
    return (
      <section id="booking-nav">
        <div className="v3-list-ql">
          <div className="container">
            <div className="row">
              <div className="v3-list-ql-inn">
                <Scrollspy items={items} currentClassName="active-list">
                  <li>
                    <a href="#property-gallery">
                      <i className="fa fa-photo" /> Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#property-details">
                      <i className="fa fa-photo" /> Details
                    </a>
                  </li>
                  <li>
                    <a href="#property-features">
                      <i className="fa fa-photo" /> Amenities
                    </a>
                  </li>
                  <li>
                    <a href="#property-location">
                      <i className="fa fa-photo" /> Location
                    </a>
                  </li>
                  <li>
                    <a href="#property-calendar">
                      <i className="fa fa-photo" /> Rates & Availability
                    </a>
                  </li>
                  <li>
                    <a href="#property-reviews">
                      <i className="fa fa-photo" /> Reviews
                    </a>
                  </li>
                </Scrollspy>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ListedBookingNavigation;
