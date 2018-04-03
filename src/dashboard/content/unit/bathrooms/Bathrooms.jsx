import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Loading from '../../../../common/components/loading';
import EditBathroom from './edit-room';
import Bathroom from './partials/Bathroom.jsx';
import FontIcon from 'common/components/font-icon';

class Bathrooms extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.deleteBathroom = this.deleteBathroom.bind(this);
  }

  componentWillMount(){}

  componentDidMount(){
    this.getOwnerUnitBathrooms();
  }

  getOwnerUnitBathrooms(){
    let { bathrooms, isFetching, error, getOwnerUnitBathrooms, match } = this.props;
    if(!isFetching){
      getOwnerUnitBathrooms(match.params.id);
    }
  }

  deleteBathroom(bathroom, index){
    let confirmDelete = confirm('Are You Sure');
    if(confirmDelete === false){
      return false;
    }
    let { deleteOwnerUnitBathrooms, match, bathrooms, updateOwnerUnitBathroomsStore, deleting } = this.props;
    if(deleting) return false;
    let params = {
      id: bathroom.id
    };
    updateOwnerUnitBathroomsStore({
      deleting: bathroom.id
    });
    deleteOwnerUnitBathrooms(params).then(() => {
      bathrooms = bathrooms.filter((bed) => bed.id != bathroom.id);
      updateOwnerUnitBathroomsStore({
        bathrooms: bathrooms,
        deleting: 0
      });
    }).catch(() => {
      updateOwnerUnitBathroomsStore({
        deleting: 0
      });
    });
  }

  render() {
    let { bathrooms, isFetching, error, history, deleting } = this.props;
    let { bathroomNumbers } = this.state;
    let baseUrlPath = history.location.pathname;
    return (
      <div>
        <div className="">
          {(() => {
            if(isFetching || !bathrooms){
              return (
                <Loading loading />
              );
            }else{
              return (
                <div>
                  <div className="bathrooms">
                    <div className="clearfix margin-bottom-md">
                      <div className="pull-right text-right">
                        <Link to={`${baseUrlPath}/add`} className="btn btn-primary"><FontIcon name="plus" /> Bathroom</Link>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Toilet</th>
                            <th>Combo Tub Shower</th>
                            <th>Tub</th>
                            <th>Shower</th>
                            <th>Jetted Tub</th>
                            <th>Bidet</th>
                            <th>Outdoor Shower</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bathrooms.map((bathroom, index) => {
                            return (
                              <tr key={index}>
                                <Bathroom
                                  bathroom={bathroom}
                                  index={index}
                                  deleting={deleting}
                                  baseUrlPath={baseUrlPath}
                                  deleteBathroom={this.deleteBathroom}
                                />
                              </tr>
                            );
                          })}  
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Route
                    path={`/dashboard/units/:id/bathrooms/add`}
                    component={EditBathroom}
                    />
                  <Route
                    path={`/dashboard/units/:id/bathrooms/edit/:roomId`}
                    component={EditBathroom}
                    />
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

Bathrooms.propTypes = {
  getOwnerUnitBathrooms: PropTypes.func,
  updateOwnerUnitBathrooms: PropTypes.func,
  bathrooms: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  match: PropTypes.object,
  deleteOwnerUnitBathrooms: PropTypes.func,
  history: PropTypes.object,
  updateOwnerUnitBathroomsStore: PropTypes.func,
  deleting: PropTypes.number
};

export default Bathrooms;
