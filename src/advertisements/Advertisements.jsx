import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from 'common/layout/page-wrapper/PageWrapper.jsx';
import Loading from 'common/components/loading';
import queryString from 'query-string';

import AdRestaurnats from "common/components/restaurants";
import AdThingsToDo from "common/components/things-todo";
import AdShopping from "common/components/shopping";
import AdTransportation from "common/components/transportation";
import AdProperties from 'common/components/properties';
import AdOthers from 'common/components/others';
import ErrorPage from 'common/components/error';

export default class Advertisements extends React.Component {

  static get propTypes() {
    return {};
  }

  constructor(props) {
    super(props);
    let url = this.props.location.search;
    let params = queryString.parse(url);
    let gId = params.gid || 0;
    this.state = {
      gId: parseInt(gId)
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  getDeals(match, reset = false, queryParams = {}) {

  }

  render() {
    let advertisementsType = this.props.match.params.advertisementId;
    let { gId } = this.state;
    return (
      <PageWrapper>
        {(() => {
          if (advertisementsType == 'resturants') {
            return (
              <AdRestaurnats gId={gId} maxRecords={10} recordCategory={3} fullPage/>
            );
          } else if (advertisementsType == 'activities') {
            return (
              <AdThingsToDo gId={gId} maxRecords={10} recordCategory={4} fullPage/>
            );
          } else if (advertisementsType == 'shopping') {
            return (
              <AdShopping gId={gId} maxRecords={10} recordCategory={5} fullPage/>
            );
          } else if (advertisementsType == 'transportation') {
            return (
              <AdTransportation gId={gId} maxRecords={10} recordCategory={6} fullPage/>
            );
          } else if (advertisementsType == 'properties') {
            return (
              <AdProperties gId={gId} maxRecords={12} recordCategory={2} fullPage/>
            );
          } else if (advertisementsType == 'others') {
            return (
              <AdOthers gId={gId} maxRecords={12} recordCategory={7} fullPage/>
            );
          } else {
            // others
            return (
              <div>
                <ErrorPage 
                  msg={'Sorry! No advertisements were found.'}
                />
              </div>
            );
          }
        })()}
      </PageWrapper>
    );
  }
}
