import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';
import Loading from 'common/components/loading';
import { required, gt, lt, email, isNumeric } from 'common/validator';
import FontIcon from 'common/components/font-icon';
import MyInput from 'common/forms/horizontal/input';

export default class BaseRate extends React.Component {

  static get propTypes(){
    return {
      getOwnerUnitBaseRate: PropTypes.func,
      match: PropTypes.object,
      baseRate: PropTypes.object,
      isFetching: PropTypes.bool,
      error: PropTypes.string,
      updateOwnerUnitBaseRate: PropTypes.func,
      updateOwnerUnitBaseRateStore: PropTypes.func,
      updating: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.form = null;
  }

  componentDidMount(){
    let { getOwnerUnitBaseRate, match } = this.props;
    let { id } = match.params;
    getOwnerUnitBaseRate(id);
  }

  componentWillUnmount(){
    let { updateOwnerUnitBaseRateStore } = this.props;
    updateOwnerUnitBaseRateStore({
      baseRate: null,
      isFetching: false,
      error: '',
      updating: false
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { updateOwnerUnitBaseRate, updating } = this.props;
    if(updating === false){
      let values = this.form.getValues();
      updateOwnerUnitBaseRate(values);
    }

  }

  render() {
    let { baseRate, isFetching, error, match, updating } = this.props;
    let unit_id = match.params.id;
    return (
      <div>
        {(() => {
          if(!baseRate || isFetching){
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
                  <Input name="unit_id" type="hidden" value={unit_id} />
                  <MyInput 
                    name="auto_nightly_rate"
                    title="Base Rate"
                    type="number"
                    value={baseRate.auto_nightly_rate.toString()}
                    left={3} 
                    center={6} 
                    right={3} 
                    help="Base rate will be used to calculate booking rates for nights that are not defined in Rates and Availability Section" 
                    description="$USD/Night"
                    maxLength={5}
                    isUsed
                    isChanged
                    validations={[lt, isNumeric, required]}
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
