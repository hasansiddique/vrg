import React, {Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import Loading from '../loading/Loading.jsx';
import Post from './partials/Post.jsx';

class AdTravelStars extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    let { destination, initiateGetHomeTravelStars } = this.props;
    let params = {};
    if(destination){
      params.destinationType = destination.destinationType;
      params.destName = destination.name;
    }
    initiateGetHomeTravelStars(params);
  }

  render() {
    const { travelStarsList, isFetching, error } = this.props;
    if(isFetching && isFetching === true){
      return (<Loading loading={true} />);
    }
    return (
      <section className="travel-stars">
        <div className="com-title">
          <h2><span>Top VR Travel Stars</span></h2>
          <p>Explore some of the best tips from around the world from our partners and friends.</p>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-10 col-md-offset-1">
              {(() => {
                if(travelStarsList === null && !error){
                  return (
                    <div className="well well-sm">
                      No Travel Stars
                    </div>
                  );
                }else if(error){
                  return (
                    <div className="well well-sm">
                      <div className="text-danger">{error}</div>
                    </div>
                  );
                }else{
                  return travelStarsList.map((post, i) => {
                    return (
                      <Post key={i} post={post} />
                    );
                  });
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AdTravelStars;
