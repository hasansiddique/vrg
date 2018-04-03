import React from 'react';

export default class Shopping extends React.PureComponent {

  constructor(props) {
    super(props);
    this.countAd = this.countAd.bind(this);
  }

  countAd(){
    let { countAdClick, shopping } = this.props;
    countAdClick(shopping.id);
  }

  render() {
    let { shopping, adImagesBaseUrl } = this.props;
    return (
      <div className="shopping">
        <a href={shopping.website_url} onClick={this.countAd} target="_blank">
          <div className="dir-hli-5">
            <div className="dir-hli-1">
              <img src={adImagesBaseUrl + shopping.picture} alt={shopping.caption}/></div>
            <div className="dir-hli-2 title"><h4>{shopping.caption}</h4></div>
          </div>
        </a>
      </div>
    );
  }
}
