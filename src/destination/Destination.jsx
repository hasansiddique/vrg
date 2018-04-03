import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PageWrapper from '../common/layout/page-wrapper/PageWrapper.jsx';
import BreadCrumb from '../common/components/breadcrumb';
import FeaturedProperties from "../common/components/properties";
import InsideDrilldown from "./partials/InsideDrilldown.jsx";
import AdTravelStars from "../common/components/travel-stars";
import AdRestaurnats from "../common/components/restaurants";
import AdThingsToDo from "../common/components/things-todo";
import AdShopping from "../common/components/shopping";
import AdOthers from "../common/components/others";
import AdTransportation from "../common/components/transportation";

import Loading from '../common/components/loading';

import HomeTopHead from "../home/top-head/HomeTopHead.jsx";

export default class Destination extends React.Component {

  static get propTypes() {
    return {
      match: PropTypes.object.isRequired,
      initiateGetDestination: PropTypes.func.isRequired,
      destination: PropTypes.object.isRequired,
      destinationProperties: PropTypes.object.isRequired,
      initiateGetDestinationProperties: PropTypes.func.isRequired,
      travelStarsList: PropTypes.array,
      resetDestination: PropTypes.func.isRequired,
      resetDestinationDrilldown: PropTypes.func.isRequired,
      resetDestinationProperties: PropTypes.func.isRequired,
      initiateGetHomeTravelStars: PropTypes.func.isRequired,
      travelStarsFetching: PropTypes.bool.isRequired,
      destinationDrilldown: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      coverPhotoName: 1
    };
    this.initiateGetHomeTravelStars = this.initiateGetHomeTravelStars.bind(this);
  }

  componentDidMount() {
    this.loadDestination();
    this.randomizeCover();
  }

  componentWillReceiveProps(props) {
    if (props.match.params.path != this.props.match.params.path) {
      this.resetDestination();
      setTimeout(() => {
        this.loadDestination();
        this.randomizeCover();
      }, 100);
    }
  }

  componentWillUnmount() {
    this.resetDestination();
  }

  randomizeCover() {
    this.setState({
      coverPhotoName: Math.ceil(Math.random() * 4)
    });
  }

  resetDestination() {
    let {resetDestination, resetDestinationDrilldown, resetDestinationProperties} = this.props;
    resetDestination();
    resetDestinationDrilldown();
    resetDestinationProperties();
  }

  loadDestination() {
    let {initiateGetDestination} = this.props;
    let {match} = this.props;
    let path = match.params.path.replace(/-/ig, ' ');
    initiateGetDestination(path, false, 1);
  }

  initiateGetHomeTravelStars() {
    let {destination, initiateGetHomeTravelStars} = this.props;
    initiateGetHomeTravelStars({
      destType: destination.destinationType
    });
  }

  render() {
    let {
      match,
      destination,
      destinationProperties,
      initiateGetDestinationProperties,
      initiateGetHomeTravelStars,
      travelStarsList,
      travelStarsFetching,
      destinationDrilldown
    } = this.props;
    let {id, detail, name, headline} = destination;
    let path = destination.drilldown || match.params.path;
    let {properties} = destinationProperties;
    let {coverPhotoName} = this.state;
    let backgroundImage = (id) ? `http://s3.amazonaws.com/vrguest-assets/destinations/${id}/${coverPhotoName}.jpg` : '';
    return (
      <PageWrapper>
        {(() => {
          if(!id){
            return (<Loading loading />);
          }else{
            return (
              <Fragment>
                <div className="destination-bg-container">
                  <HomeTopHead showHeader={false} backgroundImage={backgroundImage}/>
                </div>
                <BreadCrumb path={path}/>
                {(() => {
                  if (id) {
                    return (
                      <div>
                        <AdRestaurnats gId={id} maxRecords={5} recordCategory={3} fullPage={false}/>
                        <AdThingsToDo gId={id} maxRecords={5} recordCategory={4} fullPage={false}/>
                        <AdShopping gId={id} maxRecords={5} recordCategory={5} fullPage={false}/>
                        <AdTransportation gId={id} maxRecords={5} recordCategory={6} fullPage={false}/>
                        <AdOthers gId={id} maxRecords={5} recordCategory={7} fullPage={false}/>
                        <FeaturedProperties
                          gId={id}
                          maxRecords={12}
                          properties={properties}
                          fullPage={false}
                          initiateGetProperties={initiateGetDestinationProperties}
                        />
                      </div>
                    );
                  }
                })()}
                {(() => {
                  if (id) {
                    return (<InsideDrilldown title={`Inside ${name}`} drilldown={destinationDrilldown}/>);
                  } else {
                    return (<Loading loading/>);
                  }
                })()}
                {(() => {
                  if (id) {
                    return (
                      <AdTravelStars
                        initiateGetHomeTravelStars={this.initiateGetHomeTravelStars}
                        travelStarsList={travelStarsList}
                        isFetching={travelStarsFetching}
                      />
                    );
                  }
                })()}
                {(() => {
                  if (id) {
                    return (
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-sm-10 col-md-offset-1">
                            <div className="com-title">
                              <h2>
                                <span>{headline}</span>
                              </h2>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: detail}}/>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}
              </Fragment>
            );
          }
        })()}
      </PageWrapper>
    );
  }
}
