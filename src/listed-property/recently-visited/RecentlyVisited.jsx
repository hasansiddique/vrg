import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getImageSet} from "../../common/utilities";

class RecentlyVisited extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    const {listingId} = this.props;
    this.props.initiateGetRecentUnits({'unit_id': listingId});
  }

  render() {
    const {recentUnits} = this.props;

    return (
      <div className="pglist-p2 pglist-bg pglist-p-com" id="recently-visited">
        <div className="pglist-p-com-ti">
          <h3><span>Recently Visited</span></h3></div>
        <div className="list-pg-inn-sp">
          <div className="row pg-list-ser">
            <ul>
              {recentUnits.images && recentUnits.images.map((item, index) => {
                let imgSrc = `http://s3.amazonaws.com/vrguest-assets/properties/units/large/${getImageSet(item.unitId)}/${item.unitId}/${item.imageName}`;
                return (
                  <li key={index} className="col-md-6">
                    <Link to={`/listings/${item.unitId}`} target="_blank">
                      <div className="pg-list-ser-p1">
                        <img src={imgSrc} alt={item.unitBuildingName} width={100} height={215}/>
                      </div>
                      <div className="pg-list-ser-p2">
                        <h4>{item.unitBuildingName}</h4>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RecentlyVisited.propTypes = {
  listingId: PropTypes.number.isRequired,
  initiateGetRecentUnits: PropTypes.func.isRequired,
  recentUnits: PropTypes.object.isRequired,
};

export default RecentlyVisited;
