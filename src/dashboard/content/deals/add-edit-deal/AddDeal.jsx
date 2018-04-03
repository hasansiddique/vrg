import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import { Async } from 'react-select';
import {SingleDatePicker} from 'react-dates';
import _ from 'lodash';
import moment from 'moment';
import {required, lt, ltv, gtv} from 'common/validator';
import { Modal } from 'react-bootstrap';
import FontIcon from 'common/components/font-icon';
import Loading from 'common/components/loading';
const {
  Header,
  Body,
  Footer
} = Modal;

export default class AddDeal extends React.Component {

  static get propTypes(){
    return {
      match: PropTypes.object,
      history: PropTypes.object,
      addOwnerDeal: PropTypes.func,
      updateOwnerDeals: PropTypes.func,
      getUnits: PropTypes.func,
      deals: PropTypes.array,
      adding: PropTypes.bool,
      getUnitPrice: PropTypes.func,
      getDealCategories: PropTypes.func,
      type: PropTypes.string,
      getOwnerDeal: PropTypes.func,
      updateOwnerDeal: PropTypes.func,
      updating: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    let { match } = this.props;
    let id = match.params.id;
    this.id = false;
    if(id){
      this.edit = true;
    }
    this.state = {
      selectedUnit: null,
      checkInDate: moment(),
      checkOutDate: moment().add('day', 1),
      focusedInput: 0,
      rate: null,
      fethingRate: false,
      specialPrice: null,
      percentage: null,
      categoryId: '',
      dealCategories: [],
      deal: null
    };
    this.form = null;
    this.cancelChange = this.cancelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.getListPrice = this.getListPrice.bind(this);
    this.onSpecialPriceChange = this.onSpecialPriceChange.bind(this);
    this.onPercentageChange = this.onPercentageChange.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.onCheckinDateChange = this.onCheckinDateChange.bind(this);
    this.onCheckoutDateChange = this.onCheckoutDateChange.bind(this);
  }

  componentDidMount(){
    if(this.edit){
      this.getOwnerDeal();
    }
    this.getDealCategories();
  }

  getOptions(input, callback){
    let { getUnits } = this.props;
    if(!input) {
      callback(null, {
        options: []
      });
      return false;
    }
    let params = {
      unit_name: input
    };
    getUnits(params).then((units) => {
      let options = units.map((unit) => {
        return {
          value: unit.unit_id,
          label: unit.unit_building_name + ' - ' + unit.unit_number + ' - ' + unit.unit_id
        };
      });
      callback(null, {
        options: options,
        complete: false
      });
    }).catch(() => {

    });
  }

  getOwnerDeal(){
    let { getOwnerDeal, match } = this.props;
    let params = {
      id: match.params.id
    };
    getOwnerDeal(params).then((deal) => {
      let selectedUnit = {
        value: deal.unit_id,
        label: deal.unit_building_name + ' - ' + deal.unit_number + ' - ' + deal.unit_id
      };
      let checkInDate = moment(deal.checkindate);
      let checkOutDate = moment(deal.checkoutdate);
      let rate = deal.list_price;
      let specialPrice = deal.special_price;
      let percentage = this.calculatePercentageFromSpecialPrice(specialPrice, rate);
      let categoryId = deal.category_id;
      this.setState({
        deal: deal,
        selectedUnit,
        checkInDate,
        checkOutDate,
        rate,
        specialPrice,
        percentage,
        categoryId
      });
    }).catch(() => {

    });
  }

  getDealCategories(){
    let { getDealCategories } = this.props;
    getDealCategories().then((cats) => {
      this.setState({
        dealCategories: cats || []
      });
    }).catch(() => {

    });
  }

  cancelChange() {
    let {match, history} = this.props;
    let targetUrl = match.url.replace(/\/add$/ig, '');
    if(this.edit){
      targetUrl = match.url.replace(/\/edit\/(\d+)$/ig, '');
    }
    history.push(targetUrl);
  }

  addOwnerDeal(params) {
    let {deals, updateOwnerDeals, addOwnerDeal, type} = this.props;
    updateOwnerDeals({
      adding: true
    });
    addOwnerDeal(params).then((deal) => {
      if(type == 'active' && deal){
        updateOwnerDeals({
          deals: [deal, ...deals],
          adding: false,
        });  
      }else{
        updateOwnerDeals({
          adding: false,
        });
      }
      this.cancelChange();
    }).catch(() => {
      updateOwnerDeals({
        adding: false
      });
      this.cancelChange();
    });
  }

  updateOwnerDeal(params) {
    let {updateOwnerDeal, updateOwnerDeals, deals} = this.props;
    let { deal } = this.state;
    updateOwnerDeal(params).then((res) => {
      let newDeal = Object.assign({}, deal, params);
      let index = _.findIndex(deals, (deal) => parseInt(deal.id) == parseInt(params.deal_id));
      if(index > -1){
        newDeal.id = newDeal.deal_id;
        deals[index] = newDeal;
        this.setState({
          deal: newDeal
        });
        updateOwnerDeals({
          deals: [...deals]
        });
        this.cancelChange();
      }
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { selectedUnit, checkInDate, checkOutDate, deal, dealCategories } = this.state;
    let values = this.form.getValues();
    let params = Object.assign({}, values, {
      unit_id: selectedUnit.value,
      checkindate: checkInDate.format('MM/DD/YYYY'),
      checkoutdate: checkOutDate.format('MM/DD/YYYY'),
      category_id: values.category_id ? values.category_id : dealCategories[0].id
    });
    if(this.edit){
      params.deal_id = deal.id;
      this.updateOwnerDeal(params);
    }else{
      this.addOwnerDeal(params);
    }
  }

  getListPrice(){
    let { getUnitPrice } = this.props;
    let { checkInDate, checkOutDate, selectedUnit, fethingRate } = this.state;
    if(selectedUnit && checkInDate && checkOutDate && !fethingRate){
      let params = {
        checkin: checkInDate.format('MM/DD/YYYY'),
        checkout: checkOutDate.format('MM/DD/YYYY'),
        unit_id: selectedUnit.value
      };
      this.setState({
        fethingRate: true
      });
      getUnitPrice(params).then(({ rate }) => {
        if(rate){
          this.setState({
            rate: rate,
            fethingRate: false
          });
        }else{
          this.setState({
            fethingRate: false
          });
          alert('Unable to get rate, Please try again');  
        }
      }).catch(() => {
        this.setState({
          fethingRate: false
        });
        alert('Unable to get rate, Please try again');
      });
    }
  }

  calculatePercentageFromSpecialPrice(specialPrice, listPrice){
    return parseInt(100 - (specialPrice/listPrice) * 100);
  }

  onSpecialPriceChange(e){
    let { rate } = this.state;
    if(rate){
      let val = parseInt(e.target.value);
      let percentage = this.calculatePercentageFromSpecialPrice(val, rate);
      if(percentage > 100 || percentage < 0){
        percentage = 0;
      }
      this.setState({
        specialPrice: Math.abs(val),
        percentage: Math.abs(percentage)
      });
    }
  }

  onPercentageChange(e){
    let { rate } = this.state;
    if(rate){
      let rawValue = e.target.value.toString();
      let val = parseInt(rawValue);
      let specialPrice = parseInt(rate - (rate/100) * val);
      if(specialPrice < 0 || specialPrice > rate){
        specialPrice = 0;
      }
      this.setState({
        percentage: Math.abs(val),
        specialPrice: Math.abs(specialPrice)
      });
    }
  }

  onRateChange(e){
    let val = parseInt(e.target.value);
    if(this.state.rate != val){
      this.setState({
        rate: val
      });
    }
  }

  onCheckinDateChange(date){
    let checkInDate = date;
    let checkOutDate = this.state.checkOutDate;
    if(checkInDate > checkOutDate){
      checkOutDate = null;
    }
    this.setState({
      checkInDate: checkInDate, 
      checkOutDate: checkOutDate, 
      rate: ''
    });
  }

  onCheckoutDateChange(date){
    this.setState({
      checkOutDate: date,
      rate: ''
    });
  }

  render() {
    let { 
      selectedUnit, 
      focusedInput, 
      checkInDate, 
      checkOutDate, 
      fethingRate, 
      rate,
      specialPrice,
      percentage,
      dealCategories,
      deal
    } = this.state;
    let { adding, updating } = this.props;
    return (
      <div>
        <Modal show onHide={this.cancelChange} bsSize="large">
          <Form ref={(ref) => this.form = ref} className="form-horizontal" onSubmit={this.onSubmit}>
            <Header closeButton>{this.edit ? 'Edit Vacation Rental Deal' : 'Add Vacation Rental Deal'}</Header>
            <Body>
              {(() => {
                if(dealCategories.length == 0){
                  return (
                    <div className="text-center">
                      <Loading loading />
                    </div>
                  );
                }else{
                  return (
                    <div>
                      
                      <div className="form-group">
                        <label className="col-sm-3" htmlFor="title">Unit Name</label>
                        <div className="col-sm-9">
                          <Async
                            name="unit_name"
                            disabled={(deal) ? true : false}
                            loadOptions={this.getOptions}
                            onChange={(val) => { this.setState({ selectedUnit: val }); }}
                            value={selectedUnit}
                            placeholder="Unit Name"
                            clearable={false}
                            />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3">Deal Category</label>
                        <div className="col-sm-9">
                          <Select
                            name="category_id"
                            className="form-control"
                            selected={(deal) ? deal.category_id : ''}
                          >
                            {dealCategories.map((cat, index) => {
                              return (
                                <option key={index} value={cat.id}>{cat.category_name}</option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3" htmlFor="title">Check-in Date</label>
                        <div className="col-sm-9">
                          <div className="single-date-input">
                            <SingleDatePicker 
                              date={checkInDate}
                              onDateChange={this.onCheckinDateChange}
                              focused={(focusedInput == 1) ? true : false}
                              onFocusChange={({ focused }) => { this.setState({ focusedInput: (focused) ? 1 : 0 }); }}
                              numberOfMonths={1}
                              placeholder="Check-in Date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3" htmlFor="title">Check-out Date</label>
                        <div className="col-sm-9">
                          <div className="single-date-input">
                            <SingleDatePicker
                              date={checkOutDate}
                              onDateChange={this.onCheckoutDateChange}
                              focused={(focusedInput == 2) ? true : false}
                              disabled={(!checkInDate) ? true : false}
                              onFocusChange={({ focused }) => { this.setState({ focusedInput: (focused) ? 2 : 0 }); }}
                              numberOfMonths={1}
                              isOutsideRange={(date) => date <= checkInDate}
                              placeholder="Check-out Date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3" htmlFor="title">List Price</label>
                        <div className="col-sm-5">
                          <Input
                            type="number"
                            name="list_price"
                            className="form-control"
                            value={rate || ''}
                            isChange={this.edit}
                            isUsed
                            onChange={this.onRateChange}
                            validations={[required]}
                            />
                        </div>
                        <div className="col-sm-4">
                          <a 
                            href="javascript:;" 
                            onClick={this.getListPrice}
                            className="btn btn-primary btn-block" 
                            disabled={(selectedUnit && checkInDate && checkOutDate && !fethingRate) ? false : true}>
                            {(fethingRate) ? 'Pulling List Price From Server...' : 'Pull List Price From Server'}
                          </a>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3">Special Price</label>
                        <div className="col-sm-5">
                          <Input
                            name="special_price"
                            className="form-control"
                            type="number"
                            value={specialPrice || 0}
                            onChange={this.onSpecialPriceChange}
                            maxValue={rate || 0}
                            minValue="0"
                            disabled={(!rate) ? true : false}
                            isChange={this.edit}
                            isUsed
                            validations={[required, ltv, gtv]}
                            />
                        </div>
                        <div className="col-sm-4">
                          <div className="text-primary" style={{ marginTop: '4px' }}>Discounted Price</div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3">Percentage (%)</label>
                        <div className="col-sm-5">
                          <Input
                            name="percentage"
                            type="number"
                            className="form-control"
                            value={percentage || ''}
                            onChange={this.onPercentageChange}
                            isChange={this.edit}
                            isUsed
                            disabled={(!rate) ? true : false}
                            minValue="0"
                            maxValue="100"
                            validations={[required, ltv, gtv]}
                            />
                        </div>
                        <div className="col-sm-4">
                          <div className="text-primary" style={{ marginTop: '4px' }}>Discount Percentage</div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3">Notes</label>
                        <div className="col-sm-9">
                          <Textarea
                            name="notes"
                            className="form-control"
                            value={(deal) ? deal.notes : ''}
                            />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-3">Features</label>
                        <div className="col-sm-9">
                          <Input
                            name="features"
                            type="text"
                            className="form-control"
                            value={(deal) ? deal.features : ''}
                            />
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}
            </Body>
            <Footer>
              <div className="actions">
                {(() => {
                  if(this.edit){
                    return (
                      <Button className="btn btn-success"><FontIcon name="save" /> {(updating ? 'Updating...' : 'Update')}</Button>
                    );
                  }else{
                    return (
                      <Button className="btn btn-success"><FontIcon name="plus" /> {(adding ? 'Adding...' : 'Add Deal')}</Button>
                    );
                  }
                })()}
                <a 
                  href="javascript:;" 
                  onClick={this.cancelChange} 
                  className="btn btn-warning"><FontIcon name="remove" /> Cancel</a>
              </div>
            </Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
