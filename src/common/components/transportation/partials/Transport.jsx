import React from 'react';

export default class Transport extends React.PureComponent {

  constructor(props) {
    super(props);
    this.countAd = this.countAd.bind(this);
  }

  countAd(){
    let { countAdClick, transportation } = this.props;
    countAdClick(transportation.id);
  }

  render() {
    let { transportation, adImagesBaseUrl } = this.props;
    return (
      <a href={transportation.website_url} onClick={this.countAd} target="_blank">
        <div className="dir-hli-5">
          <div className="dir-hli-1">
            <img src={adImagesBaseUrl + transportation.picture} alt={transportation.caption}/></div>
          <div className="dir-hli-2"><h4>{transportation.caption}</h4></div>
        </div>
      </a>
    );
  }
}
