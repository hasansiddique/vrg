import React from 'react';
import {Link} from 'react-router-dom';
import {getImageSet} from 'common/utilities';

export default class Property extends React.PureComponent {

  constructor(props) {
    super(props);
    this.countAd = this.countAd.bind(this);
  }

  countAd() {
    let {countAdClick, property} = this.props;
    countAdClick(property.adsid);
  }

  render() {
    let {property, baseUrl} = this.props;
    let url = `/listings/${property.featuredunit}`;
    if (property.issingleunit == 0) {
      let ownerKey = property.adsurl.split('/').pop();
      url = `/all-properties/${property.featuredunit}/${ownerKey}`;
    }
    let photoUrl = baseUrl + 'pmlogos/' + property.image;
    if (property.issingleunit) {
      let set = getImageSet(property.featuredunit);
      photoUrl = `${baseUrl}properties/units/large/${set}/${property.featuredunit}/${property.image}`;
    }
    return (
      <Link to={url} onClick={this.countAd}>
        <div className="dir-hli-5">
          <div className="dir-hli-1" style={{minHeight: `180px`}}>
            <img src={photoUrl} height="180"/>
          </div>
          {property.issingleunit === 0 ?
            <div className="dir-hli-2 stats">
              <span>See All Properties</span>
            </div>
            :
            <div className="dir-hli-2 stats">
              {property.advertised ? <span>{property.advertised}</span> : ''}
              {property.sqftArea1 > 0 ? <span>{property.sqftArea1} <span>Sqft</span>, </span> : ''}
              {property.rooms1 > 0 ?
                <span style={{marginRight: '2px'}}>{property.rooms1} <span>Bed</span>, </span> : ''}
              {property.baths1 > 0 ? <span>{property.baths1} <span>Bath</span></span> : ''}
            </div>
          }
        </div>
      </Link>
    );
  }
}
