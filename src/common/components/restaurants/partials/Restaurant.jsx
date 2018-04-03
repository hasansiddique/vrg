import React from 'react';

export default class Restaurant extends React.PureComponent {

  constructor(props) {
    super(props);
    this.countAd = this.countAd.bind(this);
  }

  countAd(){
    let { countAdClick, restaurant } = this.props;
    countAdClick(restaurant.id);
  }

  render() {
    let { restaurant, adImagesBaseUrl } = this.props;
    return (
      <div className="resturant">
        <a href={restaurant.website_url} onClick={this.countAd} target="_blank">
          <div className="dir-hli-5">
            <div className="dir-hli-1">
              <img src={adImagesBaseUrl + restaurant.picture} alt={restaurant.caption}/>
            </div>
            <div className="dir-hli-2 title"><h4>{restaurant.caption}</h4></div>
          </div>
        </a>
      </div>
    );
  }
}
