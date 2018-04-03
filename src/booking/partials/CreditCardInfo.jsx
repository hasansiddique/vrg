import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MyInput from 'common/forms/horizontal/input';
import MyTextArea from 'common/forms/horizontal/textarea';
import {required, email, lt, gt} from 'common/validator';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';


export default class CreditCardInfo extends React.Component {

  static get propTypes(){
    return {
      
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      cctype: 'visa',
      mm: 1,
      yy: moment().year()
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.selectStep = this.selectStep.bind(this);
  }

  componentDidMount(){
  }

  onSubmit(e){
    let { updateValues } = this.props;
    e.preventDefault();
    let values = this.form.getValues();
    let cctype = this.state.cctype;
    let mm = this.state.mm;
    let yy = this.state.yy;
    values.cctype = cctype;
    values.mm = mm;
    values.yy = yy;
    updateValues(values, 4, false);
  }

  onTypeChange(e){
    this.setState({
      cctype: e.target.value
    });
  }

  selectStep(){
    let { selectStep } = this.props;
    selectStep(2);
  }

  render() {
    let orderValues = this.props.orderValues || {};
    let step = this.props.step;
    return (
      <div className="step">
        <Form ref={(ref) => this.form = ref} onSubmit={this.onSubmit} className="form-horizontal">
          <h3 className="step-heading">Credit Card Information</h3>
          <div className={`step-content ${step == 3 ? '' : 'hidden'}`}>
            <MyInput 
              name="ccnumber"
              title="Card Number"
              left={4}
              center={8}
              isUsed
              isChanged
              maxLength={22}
              minLength={11}
              validations={[gt, lt, required]}
            />
            <MyInput 
              name="ccname"
              title="Name on Card"
              left={4}
              center={8}
              isUsed
              isChanged
              validations={[required]}
            />
            <div className="form-group">
              <label htmlFor="cctype" className="col-sm-4">Card Type</label>
              <div className="col-sm-8">
                <select className="form-control" value={this.state.cctype} onChange={this.onTypeChange}>
                  <option value="visa">Visa</option>
                  <option value="master card">Master Card</option>
                  <option value="discover">Discover</option>
                </select>
              </div>
            </div>
            <MyInput 
              name="cvn"
              title="CCV"
              left={4}
              center={4}
              right={4}
              description="Code in credit card back"
              isUsed
              isChanged
              maxLength={4}
              minLength={3}
              validations={[gt, lt, required]}
            />
            <div className="row">
              <div className="col-sm-4 col-xs-4 text-right">
                <label htmlFor="mm">Expiry date</label>
              </div>
              <div className="col-sm-8 col-xs-8">
                <div className="row">
                  <div className="col-sm-3" style={{ paddingLeft: '5px', marginBottom: '5px' }}>
                    <select 
                      name="mm" 
                      className="form-control"
                      value={this.state.mm}
                      onChange={(e) => { this.setState({ mm: e.target.value }) }}>
                      {(() => {
                        let months = [];
                        for(let i = 1; i < 13; i++){
                          months.push((
                            <option key={i} value={i}>{i}</option>
                          ));
                        }
                        return months;
                      })()}
                    </select>
                  </div>
                  <div className="col-sm-4" style={{ paddingLeft: '5px', marginBottom: '5px' }}>
                    <select 
                      name="yy" 
                      className="form-control" 
                      value={this.state.yy} 
                      onChange={(e) => { this.setState({ yy: e.target.value }) }}>
                      {(() => {
                        let years = [];
                        let currentYear = moment().year();
                        for(let i = currentYear; i < currentYear + 10; i++){
                          years.push((
                            <option key={i} value={i}>{i}</option>
                          ));
                        }
                        return years;
                      })()}
                    </select>
                  </div>
                  <div className="col-sm-5" style={{ paddingLeft: '5px' }}>
                    <div className="text-info" style={{ fontSize: '1.05em', marginTop: '4px' }}>(MM/YYYY)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix">
              <div className="pull-left">
                <div className="text-left">
                  <a href="javascript:;" onClick={this.selectStep} className="btn btn-primary">Previous</a>
                </div>
              </div>
              <div className="pull-right">
                <div className="text-right">
                  <Button className="btn btn-primary">Next</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
