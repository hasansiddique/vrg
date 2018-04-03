import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Modal
} from 'react-bootstrap';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import {required, gt, lt, email} from 'common/validator';
const { Header, Body, Footer } = Modal;

export default class AddUnit extends React.Component {
  static get propTypes(){
    return {
      getUnitTypes: PropTypes.func,
      insertUnit: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      unitTypes: [],
      unitId: null,
      inserting: false,
      cancel: false
    };
    this.form = null;
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
  }

  componentDidMount(){
    let { getUnitTypes } = this.props;
    getUnitTypes().then((res) => {
      this.setState({
        unitTypes: res
      });
    }).catch(() => {});
  }

  checkError(){

  }

  onSubmit(e){
    let { insertUnit } = this.props;
    e.preventDefault();
    let params = this.form.getValues();
    this.setState({
      inserting: true
    });
    if(!params.unit_type_id){
      params.unit_type_id = '0';
    }
    insertUnit(params).then((res) => {
      this.setState({
        unitId: res.data.unit_id,
        inserting: false
      });
    }).catch((err) => {
      this.setState({
        inserting: false
      });
    });
  }

  cancelChange(){
    this.setState({
      cancel: true
    });
  }


  render() {
    let { unitTypes, unitId, inserting, cancel } = this.state;
    if(cancel){
      return (<Redirect to={`/dashboard/units`} />);
    }
    if(unitId){
      return (<Redirect to={`/dashboard/units/${unitId}`} />);
    }
    return (
      <Modal show onHide={this.cancelChange}>
        <Form
          ref={(ref) => this.form = ref}
          className="form-horizontal"
          onSubmit={this.onSubmit}
        >
          <Header closeButton>
            <div>Add New Unit</div>
            <small>Please enter the General Info about the new unit</small>
          </Header>
          <Body>
            <div className="form-group">
              <label
                className="col-sm-3"
                htmlFor="unit_building_name">Unit Name</label>
              <div className="col-sm-9">
                <Input
                  name="unit_building_name"
                  type="text"
                  isChanged
                  className="form-control"
                  checkerror={this.checkError}
                  maxLength="255"
                  validations={[required, lt]}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                className="col-sm-3"
                htmlFor="unit_number">Unit No./Name</label>
              <div className="col-sm-9">
                <Input
                  name="unit_number"
                  type="text"
                  className="form-control"
                  maxLength="255"
                  isChanged
                  checkerror={this.checkError}
                  validations={[required, lt]}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                className="col-sm-3"
                htmlFor="unit_type_id">Type of UNIT</label>
              <div className="col-sm-9">
                <Select
                  name="unit_type_id"
                  className="form-control"
                  checkerror={this.checkError}
                  isChanged
                  isUsed
                  validations={[required]}>
                  <option value="0">None</option>
                  {unitTypes.map((unitType, index) => {
                    return (
                      <option key={index} value={unitType.id}>{unitType.unit_type}</option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Body>
          <Footer>
            <div className="text-right padding-right-sm">
              <Button className="btn btn-primary">{(inserting) ? 'Inserting...' : 'Insert'}</Button>
            </div>
          </Footer>
        </Form>
      </Modal>
    );
  }
}
