import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import PageWrapper from 'common/layout/page-wrapper/PageWrapper.jsx';
import Loading from 'common/components/loading';
import DealsSection from './partials/DealsSection.jsx';

export default class Destination extends React.Component {

  static get propTypes() {
    return {
      getDeals: PropTypes.func.isRequired,
      deals: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      match: PropTypes.object,
      location: PropTypes.object
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { isFetching, match, location } = this.props;
    if(!isFetching){
      let queryParams = queryString.parse(location.search);
      this.getDeals(match, true, queryParams);
    }
  }

  componentWillReceiveProps(newProps){
    let { match, location } = newProps;
    let continent = match.params.continent;
    if(continent != this.props.match.params.continent || this.props.location.search != newProps.location.search){
      let queryParams = queryString.parse(location.search);
      this.getDeals(match, true, queryParams);
    }
  }

  componentWillUnmount() {
    
  }

  getDeals(match, reset = false, queryParams = {}){
    let { getDeals, isFetching } = this.props;
    if(!isFetching){
      let continent = match.params.continent;
      let params = {
        reset: reset
      };
      if(continent){
        params.continent = continent.replace(/-/ig, ' ');
      }
      params = Object.assign({}, queryParams, params);
      getDeals(params);
    }
  }

  render() {
    let { deals, isFetching, match, error } = this.props;
    console.log(error);
    return (
      <PageWrapper>
        <div className="container">
          <div className="deals-container">
            {(() => {
              if(isFetching){
                return (
                  <Loading loading />
                );
              }else{
                return deals.map((section, index) => {
                  return (
                    <DealsSection full={match.params.continent ? true : false} section={section} key={index} />
                  );
                });
              }
            })()}
          </div>
        </div>
      </PageWrapper>
    );
  }
}