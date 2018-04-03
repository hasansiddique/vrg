import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PropertyDetails extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    
  }

  createMarkup(data) {
    return {__html: data};
  }

  render() {
    const {detailsInfo} = this.props;

    return (
      <div id="property-details">
        {detailsInfo && detailsInfo.description && (
          <div className="pglist-p1 pglist-bg pglist-p-com">
            <div className="pglist-p-com-ti">
              <h3><span>Property Description</span></h3>
            </div>
            <div className="list-pg-inn-sp">
                  <span className="detail-content"
                        dangerouslySetInnerHTML={this.createMarkup(detailsInfo.description)}></span>
            </div>
          </div>
        )}
        {detailsInfo && detailsInfo.vacationRentalAmenities && (
          <div className="pglist-p1 pglist-bg pglist-p-com">
            <div className="pglist-p-com-ti">
              <h3><span>Amenities Detail</span></h3>
            </div>
            <div className="list-pg-inn-sp">
                  <span className="detail-content"
                        dangerouslySetInnerHTML={this.createMarkup(detailsInfo.vacationRentalAmenities)}></span>
            </div>
          </div>
        )}
        {detailsInfo && detailsInfo.activitiesAndAttractions && (
          <div className="pglist-p1 pglist-bg pglist-p-com">
            <div className="pglist-p-com-ti">
              <h3><span>Activities and Attractions</span></h3>
            </div>
            <div className="list-pg-inn-sp">
                  <span className="detail-content"
                        dangerouslySetInnerHTML={this.createMarkup(detailsInfo.activitiesAndAttractions)}></span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

PropertyDetails.propTypes = {
  initiateGetUnitDetails: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired,
  detailsInfo: PropTypes.object.isRequired,
};

export default PropertyDetails;
