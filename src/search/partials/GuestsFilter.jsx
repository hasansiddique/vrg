import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import {
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import IncrementCounter from '../../common/components/increment-counter';
const {
  Header,
  Body,
  Footer
} = Modal;

export default class GuestsFilter extends React.Component {

  static get propTypes(){
    return {
      updateFilter: PropTypes.func.isRequired,
      show: PropTypes.bool.isRequired,
      onClick: PropTypes.func,
      filters: PropTypes.object.isRequired,
      closeModal: PropTypes.func
    };
  }
  static get defaultProps(){
    return {
      show: false,
      onClick: () => {},
      closeModal: () => {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      filters: {}
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillMount(){
    this.setFilters();
  }
  componentWillReceiveProps(){
    this.setFilters();
  }
  setFilters(){
    let { filters } = this.props;
    this.setState({
      filters: filters
    });
  }

  updateFilter(key, value){
    let { filters } = this.state;
    if(typeof value == 'undefined'){
      delete filters[key];
    }else{
      filters[key] = value;
    }
    this.setState({
      filters: Object.assign({}, filters)
    });
  }

  cancelChange(){
    this.setState({
      filters: {}
    });
    this.props.closeModal();
  }
  clearFilter(){
     this.props.updateFilter({});
     this.cancelChange();
  }
  applyFilters(){
    this.props.updateFilter(this.state.filters);
    this.props.closeModal();
  }

  render() {
    let { show, onClick } = this.props;
    let { filters } = this.state;
    let propFilters = this.props.filters;
    let keys = Object.keys(propFilters);
    let active = false;
    if(keys.length > 0){
      active = true;
    }
    let adults_min = filters.adults_min || 0;
    let children_min = filters.children_min || 0;
    let totalGuests =  adults_min + children_min;
    return (
      <div>
        <a href="javascript:;" className={(active) ? 'active' : ''} onClick={onClick}>
          {(() => {
            let value = '';
            if(active){
              if(totalGuests){
                value += `${totalGuests} Guests`;
              }
              return value;
            }else{
              return 'Guests';
            }
          })()}
        </a>
        <Modal show={show} onHide={this.cancelChange}>
          <Header closeButton>
            Adults & Children
          </Header>
          <Body>
          <div className="">
            <div className="counter-buttons-container">
              <div className="row">
                <div className="col-xs-8 counter-name">
                  Adults
                </div>
                <div className="col-xs-4">
                  <div className="clearfix">
                    <IncrementCounter
                      wrapperClassName="pull-right"
                      counter={adults_min}
                      minDisabledAt={0}
                      maxDisabledAt={20}
                      updateCounter={(val) => this.updateFilter('adults_min', parseInt(val))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="counter-buttons-container">
              <div className="row">
                <div className="col-xs-8 counter-name">
                  Children
                </div>
                <div className="col-xs-4">
                  <div className="clearfix">
                    <IncrementCounter
                      wrapperClassName="pull-right"
                      counter={children_min}
                      minDisabledAt={0}
                      maxDisabledAt={20}
                      updateCounter={(val) => this.updateFilter('children_min', parseInt(val))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Body>
          <Footer>
            <div className="filter-actions clearfix">
              {(() => {
                if(Object.keys(this.props.filters).length){
                  return (
                    <div className="pull-left">
                      <a href="javascript:;" onClick={this.clearFilter} className="clear">Clear</a>
                    </div>
                  );
                }else{
                  return (
                    <div className="pull-left">
                      <a href="javascript:;" onClick={this.cancelChange} className="cancel">Cancel</a>
                    </div>
                  );
                }
              })()}
              <div className="pull-right">
                <a href="javascript:;" onClick={this.applyFilters} className="apply">Apply</a>
              </div>
            </div>
          </Footer>
        </Modal>
      </div>
    );
  }
}
