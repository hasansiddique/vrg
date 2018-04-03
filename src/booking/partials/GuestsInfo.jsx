import React from 'react';
import PropTypes from 'prop-types';
import MyInput from 'common/forms/horizontal/input';
import MyTextArea from 'common/forms/horizontal/textarea';
import {required, email} from 'common/validator';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';


export default class GuestInfo extends React.Component {

  static get propTypes(){
    return {
      
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.generateArray = this.generateArray.bind(this);
    this.selectStep = this.selectStep.bind(this);
  }

  componentDidMount(){
    
  }

  onSubmit(e){
    let { updateValues } = this.props;
    e.preventDefault();
    let values = this.form.getValues();
    let guestsNames = values['guest_name[]'];
    let guestsAges = values['guest_age[]']
    let isArray = guestsNames instanceof Array;
    if(!isArray){
      guestsNames = [guestsNames];
      guestsAges = [guestsAges];
    }
    let guestsInfo = guestsNames.map((guest, index) => {
      return {
        guest: guest,
        age: guestsAges[index]
      };
    });
    delete values['guest_name[]'];
    delete values['guest_age[]'];
    values.guests = guestsInfo;
    updateValues(values, 3);
  }

  generateArray(length){
    let myArray = [];
    for(let i = 0; i < length; i++){
      myArray.push(i);
    }
    return myArray;
  }

  selectStep(){
    let { selectStep } = this.props;
    selectStep(1);
  }

  render() {
    let orderValues = this.props.orderValues || {};
    let guests = this.props.guests;
    let step = this.props.step;

    return (
      <div className="step">
        <Form ref={(ref) => this.form = ref} onSubmit={this.onSubmit} className="form-horizontal">
          <h3 className="step-heading">Guests Information</h3>
          <div className={`step-content ${step == 2 ? '' : 'hidden'}`}>
            {this.generateArray(guests).map((val, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-sm-6">
                    <MyInput
                      name="guest_name[]"
                      title={`Guest ${index+1} Name`}
                      validations={[required]}
                      left={5}
                      center={7}
                      isChanged
                      isUsed
                    />
                  </div>
                  <div className="col-sm-6">
                    <MyInput
                      name="guest_age[]"
                      title={`Guest ${index+1} Age`}
                      validations={[required]}
                      left={5}
                      center={7}
                      isChanged
                      isUsed
                    />
                  </div>
                </div>
              );
            })}
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1">
                <MyTextArea
                  name="comments"
                  title="Comments"
                  validations={[]}
                  left={0}
                  center={12}
                />
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
