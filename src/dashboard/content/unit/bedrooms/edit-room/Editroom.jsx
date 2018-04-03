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
import {updateOwnerUnitBedrooms} from '../bedrooms.actions';
import { required, gt, lt, email } from 'common/validator';
import FontIcon from 'common/components/font-icon';

const {Header, Body} = Modal;

export default class EditRoom extends React.Component {

  static get propTypes() {
    return {
      match: PropTypes.object,
      history: PropTypes.object,
      bedrooms: PropTypes.array,
      updateOwnerUnitBedroomsStore: PropTypes.func,
      updating: PropTypes.bool,
      addOwnerUnitBedrooms: PropTypes.func
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
      bedroom: null,
      bedroomNumbers: [
        {value: 0, name: '0'},
        {value: 1, name: '1'},
        {value: 2, name: '2'},
        {value: 3, name: '3'},
        {value: 4, name: '4'},
        // {value: 5, name: '5'},
      ]
    };
    this.cancelChange = this.cancelChange.bind(this);
    this.addOrUpdateRoom = this.addOrUpdateRoom.bind(this);
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
    if (!this.state.bedroom) {
      let {match, bedrooms} = this.props;
      let { roomId } = match.params;
      roomId = parseInt(roomId);
      let room = {};
      if (roomId) {
        room = bedrooms.find((bedroom) =>  bedroom.id === roomId);
      }
      this.setState({
        bedroom: room
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
    let {bedrooms, updateOwnerUnitBedroomsStore, match} = this.props;
    let {roomId} = match.params;
    let values = this.form.getValues();
    for (let key in values) {
      if (key !== 'title') {
        if (!values[key]) {
          values[key] = '0';
        }
      }
    }
    updateOwnerUnitBedroomsStore({
      updating: true
    });
    updateOwnerUnitBedrooms(values).then((res) => {
      let rooms = bedrooms.map((bedroom) => {
        if (bedroom.id == roomId) {
          return values;
        }
        return bedroom;
      });
      updateOwnerUnitBedroomsStore({
        bedrooms: rooms,
        updating: false
      });
      this.cancelChange();
    }).catch(() => {
      updateOwnerUnitBedroomsStore({
        updating: false
      });
      this.cancelChange();
    });
  }

  addRoom(e) {
    let {bedrooms, updateOwnerUnitBedroomsStore, match, addOwnerUnitBedrooms} = this.props;
    let values = this.form.getValues();
    for (let key in values) {
      if (key !== 'title') {
        if (!values[key]) {
          values[key] = '0';
        }
      }
    }
    updateOwnerUnitBedroomsStore({
      updating: true
    });
    addOwnerUnitBedrooms(values).then((bedroom) => {
      values.id = 0;
      bedrooms.push(bedroom);
      updateOwnerUnitBedroomsStore({
        bedrooms: bedrooms,
        updating: false
      });
      this.cancelChange();
    }).catch(() => {
      updateOwnerUnitBedroomsStore({
        updating: false
      });
      this.cancelChange();
    });
  }

  addOrUpdateRoom(e) {
    e.preventDefault();
    if (this.add) {
      this.addRoom(e);
    } else {
      this.updateRoom(e);
    }
  }

  render() {
    let {bedroom, bedroomNumbers} = this.state;
    let {match, updating} = this.props;
    let {id, roomId} = match.params;
    let add = this.add;
    return (
      <Modal show onHide={this.cancelChange}>
        <Header closeButton>{(add) ? 'Add' : 'Edit'} Bedroom</Header>
        <Body>
        {(() => {
          if (bedroom == null) {
            return (
              <Loading loading/>
            );
          } else {
            return (
              <Form ref={(ref) => this.form = ref} className="form-horizontal" onSubmit={this.addOrUpdateRoom}>
                {(!add) ? (<Input name="id" value={roomId} type="hidden"/>) : (null)}
                <Input name="unit_id" value={id} type="hidden"/>
                <div className="form-group">
                  <label className="col-sm-12" style={{ textAlign: 'left' }} htmlFor="title">Title</label>
                  <div className="col-sm-12">
                    <Input
                      className="form-control"
                      name="title"
                      value={bedroom.title}
                      maxLength="100"
                      validations={[required, lt]}
                      isUsed
                      isChanged
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-5" htmlFor="king">King</label>
                      <div className="col-sm-7">
                        <Select
                          name="king"
                          className="form-control"
                          value={bedroom.king}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
                      <label className="col-sm-5" htmlFor="queen">Queen</label>
                      <div className="col-sm-7">
                        <Select
                          name="queen"
                          className="form-control"
                          value={bedroom.queen}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
                      <label className="col-sm-5" htmlFor="double">Double</label>
                      <div className="col-sm-7">
                        <Select
                          name="double"
                          className="form-control"
                          value={bedroom.double}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
                      <label className="col-sm-5" htmlFor="twin_single">Twin Single</label>
                      <div className="col-sm-7">
                        <Select
                          name="twin_single"
                          className="form-control"
                          value={bedroom.twin_single}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
                      <label className="col-sm-5" htmlFor="crib">Crib</label>
                      <div className="col-sm-7">
                        <Select
                          name="crib"
                          className="form-control"
                          value={bedroom.crib}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
                      <label className="col-sm-5" htmlFor="sleep_sofa">Sleep Sofa</label>
                      <div className="col-sm-7">
                        <Select
                          name="sleep_sofa"
                          className="form-control"
                          value={bedroom.sleep_sofa}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
                      <label className="col-sm-5" htmlFor="child_bed">Child Bed</label>
                      <div className="col-sm-7">
                        <Select
                          name="child_bed"
                          className="form-control"
                          value={bedroom.child_bed}
                          validations={[() => {
                          }]}>
                          {bedroomNumbers.map((number, index) => {
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
