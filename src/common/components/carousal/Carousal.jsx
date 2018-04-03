import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import SlickCarousel from 'react-slick';

export default class CarousalSlider extends React.Component {

  constructor(props){
    super(props);
    this.mainCarousel = null;
    this.pagingCarousel = null;
    this.state = {
      activeSlide: 0
    };
  }

  componentDidMount(){
    if(this.mainCarousel && this.props.forceUpdate){
      setTimeout(() => {
        if(this.mainCarousel){
          this.mainCarousel.forceUpdate();
        }
      }, 100);
    }
  }

  render(){
    let { items, settings } = this.props;
    let { showThumbs, dots } = settings;
    let config = {
        lazyLoad: true,
        dots: dots,
        draggable: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (i) => {
          this.setState({
            activeSlide: i
          }, () => {
            if(this.pagingCarousel){
              this.pagingCarousel.slickGoTo(i);
            }
          });
        }
    };
    let configPaging = {
      lazyLoad: true,
      dots: false,
      infinite: false,
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      centerMode: false,
      centerPadding: '50px',
      draggable: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    };
    return (
      <div className="my-carousel">
        <SlickCarousel ref={c => this.mainCarousel = c } {...config}>
          {items.map((item, index) => {
            let imgMarkup = (<img src={item.src} alt={item.alt}/>);
            return (
              <div key={index} className="slide">
                <div>
                  {(() => {
                    if(item.link){
                      return (
                        <Link to={item.link}>
                          {imgMarkup}
                        </Link>
                      );
                    }else{
                      return imgMarkup;
                    }
                  })()}
                  {item.description && (
                    <p className="legend carousal-image-text">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </SlickCarousel>
        {(() => {
          if(showThumbs === true){
            return (
              <div className="paging">
                <SlickCarousel {...configPaging} ref={(ref) => this.pagingCarousel = ref}>
                  {items.map((item, index) => {
                    let myActive = (this.state.activeSlide === index) ? 'my-active' : '';
                    return (
                      <div key={index} className={`slide`} onClick={(e) => { this.mainCarousel.slickGoTo(index) }}>
                        <div className="thumb-container">
                          <img src={item.src} alt={item.alt} className={myActive}/>
                        </div>
                      </div>
                    );
                  })}
                </SlickCarousel>
              </div>
            ); 
          }
        })()}
      </div>
    );
  }
}

CarousalSlider.propTypes = {
  items: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  forceUpdate: PropTypes.bool
};

