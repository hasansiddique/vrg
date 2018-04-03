import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../../../common/components/loading';
import {
  Modal
} from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import {updateOwnerUnitBathrooms} from '../bathrooms.actions';
import { required } from 'common/validator';
import FontIcon from 'common/components/font-icon';

const {Header, Body} = Modal;

export default class EditRoom extends React.Component {

  static get propTypes() {
    return {
      match: PropTypes.object,
      history: PropTypes.object,
      bathrooms: PropTypes.array,
      updateOwnerUnitBathroomsStore: PropTypes.func,
      updating: PropTypes.bool,
      addOwnerUnitBathrooms: PropTypes.func
    };
  }

  static get defaultProps() {
    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      updating: false,
      bathroom: null,
      types: [
        {value: 'FULL_BATH', name: 'Full'},
        {value: 'HALF_BATH', name: 'Half'}
      ],
      bathroomNumbers: [
        {value: 0, name: '0'},
        {value: 1, name: '1'},
        {value: 2, name: '2'},
        {value: 3, name: '3'},
        {value: 4, name: '4'},
        // {value: 5, name: '5'},
      ]
    };
    this.cancelChange = this.cancelChange.bind(this);
    this.addOrUpdateBathroom = this.addOrUpdateBathroom.bind(this);
    this.form = null;
    this.add = false;
  }

  componentWillMount() {
    let {match} = this.props;
    let {roomId} = match.params;
    if (!roomId) {
      this.add = true;
    }
  }

  componentDidMount() {
    this.getRoom();
  }

  getRoom() {
    if (!this.state.bathroom) {
      let {match, bathrooms} = this.props;
      let {id, roomId} = match.params;
      let room = {};
      if (roomId) {
        room = bathrooms.find((bathroom) => bathroom.id == roomId);
      }
      this.setState({
        bathroom: room
      });
    }
  }

  cancelChange() {
    let {match, history} = this.props;
    let targetUrl = match.url.replace(/\/edit\/\d+$/ig, '');
    if (this.add) {
      targetUrl = match.url.replace(/\/add$/ig, '');
    }
    history.push(targetUrl);
  }

  updateRoom(e) {
    let {bathrooms, updateOwnerUnitBathroomsStore, match} = this.props;
    let {roomId} = match.params;
    let values = this.form.getValues();
    for (let key in values) {
      if (key != 'title') {
        if (!values[key]) {
          values[key] = '0';
        }
      }
    }
    updateOwnerUnitBathroomsStore({
      updating: true
    });
    updateOwnerUnitBathrooms(values).then((res) => {
      let rooms = bathrooms.map((bathroom) => {
        if (bathroom.id == roomId) {
          return values;
        }
        return bathroom;
      });
      updateOwnerUnitBathroomsStore({
        bathrooms: rooms,
        updating: false
      });
      this.cancelChange();
    }).catch(() => {
      updateOwnerUnitBathroomsStore({
        updating: false
      });
      this.cancelChange();
    });
  }

  addRoom(e) {
    let {bathrooms, updateOwnerUnitBathroomsStore, addOwnerUnitBathrooms} = this.props;
    let values = this.form.getValues();
    for (let key in values) {
      if (key != 'title') {
        if (!values[key]) {
          values[key] = '0';
        }
      }
    }
    updateOwnerUnitBathroomsStore({
      updating: true
    });
    addOwnerUnitBathrooms(values).then((bathroom) => {
      values.id = 0;
      bathrooms.push(bathroom);
      updateOwnerUnitBathroomsStore({
        bathrooms: bathrooms,
        updating: false
      });
      this.cancelChange();
    }).catch(() => {
      updateOwnerUnitBathroomsStore({
        updating: false
      });
      this.cancelChange();
    });
  }

  addOrUpdateBathroom(e) {
    e.preventDefault();
    if (this.add) {
      this.addRoom(e);
    } else {
      this.updateRoom(e);
    }
  }

  render() {
    let {bathroom, bathroomNumbers, types} = this.state;
    let {match, updating} = this.props;
    let {id, roomId} = match.params;
    let add = this.add;
    return (
      <Modal show onHide={this.cancelChange}>
        <Header closeButton>{(add) ? 'Add' : 'Edit'} Bathroom</Header>
        <Body>
        {(() => {
          if (bathroom == null) {
            return (
              <Loading loading/>
            );
          } else {
            return (
              <Form ref={(ref) => this.form = ref} className="form-horizontal" onSubmit={this.addOrUpdateBathroom}>
                {(!add) ? (<Input name="id" value={roomId} type="hidden"/>) : (null)}
                <Input name="unit_id" value={id} type="hidden"/>
                <div className="form-group">
                  <label className="col-sm-12" style={{ 'textAlign': 'left' }}>Title</label>
                  <div className="col-sm-12">
                    <Input
                      className="form-control"
                      name="title"
                      value={bathroom.title}
                      maxLength="100"
                      validations={[required]}
                      isUsed
                      isChanged
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="type_of_bath">Type</label>
                      <div className="col-sm-7">
                        <Select
                          name="type_of_bath"
                          className="form-control"
                          value={bathroom.type_of_bath || 'FULL_BATH'}
                          validations={[]}>
                          {types.map((number, index) => {
                            return (
                              <option key={index} value={number.value}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="combo_tub_shower">Combo Tub Shower</label>
                      <div className="col-sm-7">
                        <Select
                          name="combo_tub_shower"
                          className="form-control"
                          value={bathroom.combo_tub_shower}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="shower">Shower</label>
                      <div className="col-sm-7">
                        <Select
                          name="shower"
                          className="form-control"
                          value={bathroom.shower}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="toilet">Toilet</label>
                      <div className="col-sm-7">
                        <Select
                          name="toilet"
                          className="form-control"
                          value={bathroom.toilet}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="outdoor_shower">Outdoor Shower</label>
                      <div className="col-sm-7">
                        <Select
                          name="outdoor_shower"
                          className="form-control"
                          value={bathroom.outdoor_shower}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="tub">Tub</label>
                      <div className="col-sm-7">
                        <Select
                          name="tub"
                          className="form-control"
                          value={bathroom.tub}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="jetted_tub">Jetted Tub</label>
                      <div className="col-sm-7">
                        <Select
                          name="jetted_tub"
                          className="form-control"
                          value={bathroom.jetted_tub}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="bidet">Bidet</label>
                      <div className="col-sm-7">
                        <Select
                          name="bidet"
                          className="form-control"
                          value={bathroom.bidet}
                          validations={[]}>
                          {bathroomNumbers.map((number, index) => {
                            return (
                              <option key={index} value={number.name}>{number.name}</option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {(() => {
                    if (add) {
                      return (
                        <Button className="btn btn-primary"><FontIcon name="plus" /> {(updating ? 'Adding...' : 'Add')}</Button>
                      );
                    } else {
                      return (
                        <Button className="btn btn-primary"><FontIcon name="save" /> {(updating ? 'Updating...' : 'Update')}</Button>
                      );
                    }
                  })()}
                </div>
              </Form>
            );
          }
        })()}
        </Body>
      </Modal>
    );
  }
}
