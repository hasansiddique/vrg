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
const {
  Header,
  Body,
  Footer
} = Modal;

export default class AvreageNightlyRateFilter extends React.Component {

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

  render() {
    let { show, onClick } = this.props;
    let { filters } = this.state;
    let minValue = filters.price_min || 1;
    let maxValue = filters.price_max || 1000;
    let propFilters = this.props.filters;
    let keys = Object.keys(propFilters);
    let active = false;
    if(keys.length > 0){
      active = true;
    }
    return (
      <div>
        <a href="javascript:;" className={(active) ? 'active' : ''} onClick={onClick}>
          {(() => {
            if(active){
              let value = `${minValue}$`;
              if(maxValue){
                value += ` - ${maxValue}$`;
              }
              return value;
            }else{
              return 'Avreage Nightly Rate';
            }
          })()}
        </a>
        <Modal show={show} onHide={this.cancelChange}>
          <Header closeButton>
            Avreage Nightly Rate
          </Header>
          <Body>
            <div className="row" style={{ marginBottom: '20px' }}>
              <div className="col-sm-12">
                {minValue}$ - {maxValue}$
              </div>
              <div className="col-sm-12">
                <div className="slider">
                  <Rheostat 
                    min={1}
                    max={1000}
                    values={[minValue, maxValue]}
                    onChange={(data) => {
                      let values = data.values;
                      let min = values[0];
                      let max = values[1];
                      if(min){
                        this.updateFilter('price_min', min);
                      }
                      if(max){
                        this.updateFilter('price_max', max);
                      }
                    }}
                  />
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
