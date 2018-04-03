import React from 'react';

export default class Other extends React.PureComponent {

  constructor(props) {
    super(props);
    this.countAd = this.countAd.bind(this);
  }

  countAd(){
    let { countAdClick, other } = this.props;
    countAdClick(other.id);
  }

  render() {
    let { other, adImagesBaseUrl } = this.props;
    return (
      <div className="resturant">
        <a href={other.website_url} onClick={this.countAd} target="_blank">
          <div className="dir-hli-5">
            <div className="dir-hli-1">
              <img src={adImagesBaseUrl + other.picture} alt={other.caption}/>
            </div>
            <div className="dir-hli-2 title"><h4>{other.caption}</h4></div>
          </div>
        </a>
      </div>
    );
  }
}
