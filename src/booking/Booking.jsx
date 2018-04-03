import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {get, map, startCase} from 'lodash';
import PageWrapper from 'common/layout/page-wrapper/PageWrapper.jsx';
import Loading from 'common/components/loading';
import storage from 'common/storage';
import config from '../config';
import PersonalInfo from './partials/PersonalInfo.jsx';
import GuestsInfo from './partials/GuestsInfo.jsx';
import CreditCardInfo from './partials/CreditCardInfo.jsx';
import ReviewOrder from './partials/ReviewOrder.jsx';
import ErrorPage from 'common/components/error';

// currency
let currency = config.currency;


export default class Destination extends React.Component {

  static get propTypes() {
    return {
      match: PropTypes.object,
      location: PropTypes.object,
      calculationInfo: PropTypes.object,
      initiateListingCalculation: PropTypes.func.isRequired,
      getStates: PropTypes.func.isRequired,
      confirmBooking: PropTypes.func.isRequired,
      getCountries: PropTypes.func.isRequired,
      listingCalculationError: PropTypes.object
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      values: {},
      step: 1,
      booking: false,
      booked: false,
      errors: []
    };
    this.updateValues = this.updateValues.bind(this);
    this.selectStep = this.selectStep.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
  }

  componentDidMount(){
    let { initiateListingCalculation } = this.props;
    let order = storage.get('order');
    if(order){
      initiateListingCalculation(order.unit_id, order.checkInDate, order.checkOutDate, order.guests, order.deal_id);
    }
  }

  updateValues(values, step = null, updateLocalStorage = true){
    let updatedValues = Object.assign({}, this.state.values, values);
    if(updateLocalStorage){
      storage.set('orderValues', updatedValues);
    }
    this.setState({
      values: updatedValues,
      step: step ? step : this.state.step
    });
  }

  selectStep(step){
    this.setState({ step: step });
  }

  confirmBooking(){
    let { confirmBooking } = this.props;
    let { booking } = this.state;
    if(booking){
      return false;
    }
    let order = storage.get('order');
    delete order.guests;
    let orderValues = this.state.values;
    orderValues.guests_info = orderValues.guests;
    delete orderValues.guests;
    orderValues = Object.assign({}, orderValues, order);
    // orderValues.unit_id = 800;
    orderValues.iagree = 1;
    if(order.deal_id){
      orderValues.deal_id = order.deal_id;
    }
    this.setState({
      booking: true
    });
    confirmBooking(orderValues).then((res) => {
      if(res.status == false){
        this.setState({
          booking: false,
          errors: res.errmsgs 
        });
      }else{
        this.setState({
          booking: false,
          booked: true
        });
        storage.remove('order');
        storage.remove('orderValues');
      }
    }).catch((err) => {
      this.setState({
        booking: false,
        errors: ['Something went wrong, Please try again']
      });
    });
  }

  render() {
    let { calculationInfo, getStates, getCountries, listingCalculationError, isFetching } = this.props;
    let { step, booking, booked, errors } = this.state;
    let order = storage.get('order');
    if(!order){
      return (
        <Redirect to="/" />
      );
    }
    return (
      <PageWrapper>
        <div className="container">
          <div className="booking-container">
            {(() => {
              if(isFetching || (!calculationInfo.totalRentalWithTax && !listingCalculationError.msg)){
                return (
                  <Loading loading />
                );
              }else{
                return (
                  <div className="row">
                    {(() => {
                      if(listingCalculationError.msg){
                        return (
                          <ErrorPage msg={listingCalculationError.msg} />
                        );
                      }else{
                        return (
                          <Fragment>
                            <div className="col-sm-8">
                              {(() => {
                                if(booked){
                                  return (
                                    <div className="thanks-page">
                                      <h2 className="text-success" style={{ margin: '5px 0 10px 0', padding: 0 }}>Thank you for your booking</h2>
                                      <div>
                                        <p className="text-danger">YOU HAVE JUST BEEN SENT AN EMAIL.</p>
                                        <p className="">Please check your email now. If you don’t see a message from reservations@vrguest.com, please check your junk email box.</p>
                                        <p className="">You will receive a confimation email of your booking as soon as the owner of the property or an agent confirms your booking to the requested dates and the required deposits are received by our office</p>
                                        <p className="">Click <Link to="/">Here</Link> to go to Home Page</p>
                                      </div>
                                    </div>
                                  );
                                }else{
                                  return (
                                    <Fragment>
                                      <PersonalInfo 
                                        step={step}
                                        getStates={getStates} 
                                        getCountries={getCountries}
                                        updateValues={this.updateValues}
                                        orderValues={storage.get('orderValues')}
                                        />
                                      <GuestsInfo
                                        step={step}
                                        guests={order.guests}
                                        updateValues={this.updateValues}
                                        orderValues={storage.get('orderValues')}
                                        selectStep={this.selectStep}
                                      />
                                      <CreditCardInfo
                                        step={step}
                                        updateValues={this.updateValues}
                                        selectStep={this.selectStep}
                                      />
                                      <ReviewOrder
                                        step={step}
                                        selectStep={this.selectStep}
                                        orderValues={storage.get('orderValues')}
                                        order={order}
                                        calculationInfo={calculationInfo}
                                        currency={currency}
                                        confirmBooking={this.confirmBooking}
                                        booking={booking}
                                        errors={errors}
                                      />
                                    </Fragment>
                                  );
                                }
                              })()}
                            </div>
                            <div className="col-sm-4">
                              <div className="order-summary">
                                <h2>Booking Summary</h2>
                                <ul>
                                  <li className="clearfix">
                                    <div className="pull-left">
                                      Check In
                                    </div>
                                    <div className="pull-right">
                                      {order.checkInDate}
                                    </div>
                                  </li>
                                  <li className="clearfix">
                                    <div className="pull-left">
                                      Check Out
                                    </div>
                                    <div className="pull-right">
                                      {order.checkOutDate}
                                    </div>
                                  </li>
                                  <li className="clearfix">
                                    <div className="pull-left">
                                      Guests
                                    </div>
                                    <div className="pull-right">
                                      {order.guests}
                                    </div>
                                  </li>
                                  {(() => {
                                    if(calculationInfo.breakdown && !order.deal_id){
                                      return (
                                        <Fragment>
                                          {map(get(calculationInfo, 'breakdown[0]'), (value, key) => {
                                            if(value){
                                              return (
                                                <li key={key} className="clearfix">
                                                  <div className="pull-left">
                                                    {startCase(key)}
                                                  </div>
                                                  <div className="pull-right">
                                                    {(() => {
                                                      if(typeof value == 'number'){
                                                        return currency + value;
                                                      }else{
                                                        return value;
                                                      }
                                                    })()}
                                                  </div>
                                                </li>
                                              );
                                            }
                                          })}
                                          <li className="clearfix">
                                            <div className="pull-left">
                                              <strong>Total</strong>
                                            </div>
                                            <div className="pull-right">
                                              {currency + calculationInfo.totalRentalWithTax}
                                            </div>
                                          </li>
                                        </Fragment>
                                      );
                                    }else{
                                      let totalTax = parseFloat(calculationInfo.totalRentalWithTax - calculationInfo.totalRentalWithoutTax);
                                      if(totalTax){
                                        totalTax = totalTax.toFixed(2);
                                      }
                                      return (
                                        <Fragment>
                                          {(() => {
                                            if(calculationInfo.fiListPrice){
                                              return (
                                                <li className="clearfix">
                                                  <div className="pull-left">
                                                    List Price
                                                  </div>
                                                  <div className="pull-right">
                                                    {currency + calculationInfo.fiListPrice}
                                                  </div>
                                                </li>
                                              );   
                                            }
                                          })()}
                                          <li className="clearfix">
                                            <div className="pull-left">
                                              Special Price
                                            </div>
                                            <div className="pull-right">
                                              {currency + calculationInfo.totalRentalWithoutTax}
                                            </div>
                                          </li>
                                          <li className="clearfix">
                                            <div className="pull-left">
                                              Tax
                                            </div>
                                            <div className="pull-right">
                                              {currency + (totalTax)}
                                            </div>
                                          </li>
                                          <li className="clearfix">
                                            <div className="pull-left">
                                              <strong>Total</strong>
                                            </div>
                                            <div className="pull-right">
                                              {currency + calculationInfo.totalRentalWithTax}
                                            </div>
                                          </li>
                                        </Fragment>
                                      );
                                    }
                                  })()}
                                </ul>
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                    })()}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </PageWrapper>
    );
  }
}