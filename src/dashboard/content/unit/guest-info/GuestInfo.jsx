import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';
import Loading from 'common/components/loading';
import { required, gt, lt, email, isNumeric, ltv, gtv } from 'common/validator';
import FontIcon from 'common/components/font-icon';
import MyInput from 'common/forms/horizontal/input';
import MyTextArea from 'common/forms/horizontal/textarea';

export default class GuestInfo extends React.Component {

  static get propTypes(){
    return {
      getOwnerUnitGuestInfo: PropTypes.func,
      match: PropTypes.object,
      guestInfo: PropTypes.object,
      isFetching: PropTypes.bool,
      error: PropTypes.string,
      updateOwnerUnitGuestInfo: PropTypes.func,
      updateOwnerUnitGuestInfoStore: PropTypes.func,
      updating: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.form = null;
  }

  componentDidMount(){
    let { getOwnerUnitGuestInfo, match } = this.props;
    let { id } = match.params;
    getOwnerUnitGuestInfo(id);
  }

  componentWillUnmount(){
    let { updateOwnerUnitGuestInfoStore } = this.props;
    updateOwnerUnitGuestInfoStore({
      guestInfo: null,
      isFetching: false,
      error: '',
      updating: false
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { updateOwnerUnitGuestInfo, updating } = this.props;
    if(updating === false){
      let values = this.form.getValues();
      updateOwnerUnitGuestInfo(values);
    }

  }

  render() {
    let { guestInfo, isFetching, error, updating } = this.props;
    return (
      <div>
        {(() => {
          if(!guestInfo || isFetching){
            return (
              <Loading loading />
            );
          }else{
            return (
              <div>
                <Form
                  ref={(ref) => this.form = ref}
                  className="form-horizontal"
                  onSubmit={this.onSubmit}>
                  <Input name="unit_id" type="hidden" value={guestInfo.unit_id} />
                  <MyInput 
                    name="pet_fee_each"
                    title="Pet Fee Each"
                    type="number"
                    maxLength={3}
                    value={guestInfo.pet_fee_each.toString()}
                    validations={[isNumeric, required, lt]}
                    left={3}
                    center={3}
                    right={6}
                    description="$USD Required"
                    isChanged
                    isUsed
                  />
                  <MyInput 
                    name="cleaning_fee"
                    title="Cleaning Fee"
                    type="number"
                    value={guestInfo.cleaning_fee.toString()}
                    maxLength={3}
                    validations={[isNumeric, required, lt]}
                    left={3}
                    center={3}
                    right={6}
                    description="$USD Required"
                    isChanged
                    isUsed
                  />
                  <MyInput 
                    name="state_tax"
                    title="State Tax"
                    type="number"
                    value={guestInfo.state_tax.toString()}
                    maxValue={100}
                    minValue={0}
                    validations={[ltv, gtv, isNumeric, required]}
                    left={3}
                    center={3}
                    right={6}
                    description="% Required"
                    isChanged
                    isUsed
                  />
                  <MyInput 
                    name="county_tax"
                    title="County Tax"
                    type="number"
                    value={guestInfo.county_tax.toString()}
                    maxValue={100}
                    minValue={0}
                    validations={[ltv, gtv, isNumeric, required]}
                    left={3}
                    center={3}
                    right={6}
                    description="% Required"
                    isChanged
                    isUsed
                  />
                  <MyInput 
                    name="security_deposit"
                    title="Security Deposit"
                    type="number"
                    value={guestInfo.security_deposit.toString()}
                    maxLength={6}
                    validations={[lt, isNumeric, required]}
                    left={3}
                    center={3}
                    right={6}
                    description="$USD Required"
                    isChanged
                    isUsed
                  />
                  <MyInput 
                    name="advance_charge"
                    title="Advance Charge %age"
                    type="number"
                    value={guestInfo.advance_charge.toString()}
                    maxValue={100}
                    minValue={1}
                    validations={[ltv, gtv, isNumeric, required]}
                    left={3}
                    center={3}
                    right={6}
                    description="% Required"
                    isChanged
                    isUsed
                  />
                  <MyTextArea 
                    name="payment_policy"
                    title="Payment Policy"
                    value={guestInfo.payment_policy.toString()}
                    maxLength={2000}
                    validations={[lt]}
                    isChanged
                    isUsed
                  />
                  <MyTextArea 
                    name="driving_directions"
                    title="Driving directions from the office to the rentals unit"
                    value={guestInfo.driving_directions.toString()}
                    maxLength={2000}
                    validations={[lt]}
                    isChanged
                    isUsed
                  />
                  <MyTextArea 
                    name="meta_keywords"
                    title="Meta Keywords"
                    value={decodeURIComponent(guestInfo.meta_keywords.toString())}
                    maxLength={500}
                    validations={[lt]}
                    isChanged
                    isUsed
                  />
                  <MyTextArea 
                    name="meta_description"
                    title="Meta Description"
                    value={decodeURIComponent(guestInfo.meta_description.toString())}
                    maxLength={500}
                    validations={[lt]}
                    isChanged
                    isUsed
                  />
                  <div className="form-group">
                    <div className="col-sm-12 text-right">
                      <Button className="btn btn-primary">
                        <FontIcon name="save" /> {(updating) ? 'Updating...' : 'Update'}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
