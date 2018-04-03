import React from 'react';
import PropTypes from 'prop-types';
import { 
  Modal, 
  Checkbox,
  Button
} from 'react-bootstrap';
const {
  Header,
  Body,
  Footer
} = Modal;

export default class AmenitiesFilter extends React.Component {
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
    let { show, onClick, closeModal, updateFilter } = this.props;
    let { filters } = this.state;
    let propFilters = this.props.filters;
    let keys = Object.keys(propFilters);
    let active = false;
    if(keys.length > 0){
      active = true;
    }
    return (
      <div>
        <a className={(active) ? 'active' : ''} href="javascript:;" onClick={onClick}>
          {(() => {
            if(keys.length === 0){
              return 'Amenities';
            }else{
              return (
                <span>
                  {keys.map((value, key) => {
                    if(key > 1){
                      return null;
                    }else if(key == 1){
                      return (
                        <span key={key}> & {keys.length - 1} More</span>
                      );
                    }
                    return (
                      <span key={key}>{value.replace(/_/ig, ' ').toUpperCase()}</span>
                    );
                  })}
                </span>
              );
            }
          })()}
        </a>
        <Modal show={show} onHide={this.cancelChange}>
          <Header closeButton>
            Amenities
          </Header>
          <Body>
            <div className="row">
              <div className="col-sm-6">
                <Checkbox checked={filters.swimming_pool || false} onChange={(e) => this.updateFilter('swimming_pool', (e.target.checked) ? true : undefined)}>
                  Pool
                </Checkbox>
                <Checkbox checked={filters.balcony || false} onChange={(e) => this.updateFilter('balcony', (e.target.checked) ? true : undefined)}>
                  Balcony
                </Checkbox>
                <Checkbox checked={filters.wifi || false} onChange={(e) => this.updateFilter('wifi', (e.target.checked) ? true : undefined)}>
                  Wireless Internet
                </Checkbox>
                <Checkbox checked={filters.laundary || false} onChange={(e) => this.updateFilter('laundary', (e.target.checked) ? true : undefined)}>
                  Laundry in Unit
                </Checkbox>
                <Checkbox checked={filters.pets || false} onChange={(e) => this.updateFilter('pets', (e.target.checked) ? true : undefined)}>
                  Pets Considered
                </Checkbox>
                <Checkbox checked={filters.hot_tub || false} onChange={(e) => this.updateFilter('hot_tub', (e.target.checked) ? true : undefined)}>
                  Hot tub
                </Checkbox>
                <Checkbox checked={filters.tv_in_bedroom || false} onChange={(e) => this.updateFilter('tv_in_bedroom', (e.target.checked) ? true : undefined)}>
                  Flat screen TV
                </Checkbox>
              </div>
              <div className="col-sm-6">
                <Checkbox checked={filters.beachfront || false} onChange={(e) => this.updateFilter('beachfront', (e.target.checked) ? true : undefined)}>
                  Beachfront
                </Checkbox>
                <Checkbox checked={filters.beachview || false} onChange={(e) => this.updateFilter('beachview', (e.target.checked) ? true : undefined)}>
                  Beachview
                </Checkbox>
                <Checkbox checked={filters.waterfront || false} onChange={(e) => this.updateFilter('waterfront', (e.target.checked) ? true : undefined)}>
                  Water front
                </Checkbox>
                <Checkbox checked={filters.waterview || false} onChange={(e) => this.updateFilter('waterview', (e.target.checked) ? true : undefined)}>
                  Water view
                </Checkbox>
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
