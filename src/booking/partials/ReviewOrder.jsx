import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {get, map, startCase} from 'lodash';


export default class ReviewOrder extends React.Component {

  static get propTypes(){
    return {
      confirmBooking: PropTypes.func.isRequired,
      selectStep: PropTypes.func.isRequired,
      orderValues: PropTypes.object,
      step: PropTypes.number.isRequired,
      calculationInfo: PropTypes.object,
      order: PropTypes.object,
      currency: PropTypes.string,
      booking: PropTypes.bool.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      iagree: 0
    };
    this.selectStep = this.selectStep.bind(this);
  }

  componentDidMount(){
    
  }

  selectStep(){
    let { selectStep } = this.props;
    selectStep(3);
  }

  render() {
    let { step, order, calculationInfo, currency, confirmBooking, booking, errors } = this.props;
    let { iagree } = this.state;

    return (
      <div className="step">
        <h3 className="step-heading">Review Your Booking</h3>
        <div className={`step-content ${step == 4 ? '' : 'hidden'}`}>
          <div className="order-summary">
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
            <div className="text-center">
              <h4>This booking constitutes agreement of <a href="javascript:;">"Terms &amp; Conditions"</a></h4>
            </div>
            <div>
              <label className="checkbox" style={{ textAlign: 'center' }}>
                <input 
                  type="checkbox" 
                  value="1" 
                  onChange={(e) => { this.setState({ iagree: e.target.checked }); console.log(e); }}
                  checked={iagree == 1 ? true : false} /> I Agree (You must agree to proceed)
              </label>
            </div>
          </div>
          {(() => {
            if(errors.length){
              return (
                <div className="alert alert-danger">
                  <ul>
                    {errors.map((err, index) => {
                      return (
                        <li key={index}>{err}</li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })()}
          <div className="clearfix">
            <div className="pull-left">
              <div className="text-left">
                <a href="javascript:;" onClick={this.selectStep} className="btn btn-primary">Previous</a>
              </div>
            </div>
            <div className="pull-right">
              <div className="text-right">
                <a 
                  href="javascript:;" 
                  onClick={confirmBooking} 
                  className={`btn btn-primary ${iagree ? '' : 'disabled'}`}>{(booking) ? 'Booking...' : 'Book Now'}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
