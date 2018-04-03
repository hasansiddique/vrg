import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Loading from '../../../../common/components/loading';
import EditRoom from './edit-room';
import Bedroom from './partials/Bedroom.jsx';
import FontIcon from 'common/components/font-icon';

class Bedrooms extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.deleteBedroom = this.deleteBedroom.bind(this);
  }

  componentWillMount(){}

  componentDidMount(){
    this.getOwnerUnitBedrooms();
  }

  getOwnerUnitBedrooms(){
    let { isFetching, getOwnerUnitBedrooms, match } = this.props;
    if(!isFetching){
      getOwnerUnitBedrooms(match.params.id);
    }
  }

  deleteBedroom(bedroom, index){
    let confirmDelete = confirm('Are You Sure');
    if(confirmDelete === false){
      return false;
    }
    let { deleteOwnerUnitBedrooms, match, bedrooms, updateOwnerUnitBedroomsStore, deleting } = this.props;
    if(deleting) return false;
    let params = {
      id: bedroom.id
    };
    updateOwnerUnitBedroomsStore({
      deleting: bedroom.id
    });
    deleteOwnerUnitBedrooms(params).then(() => {
      bedrooms = bedrooms.filter((bed) => bed.id != bedroom.id);
      updateOwnerUnitBedroomsStore({
        bedrooms: bedrooms,
        deleting: 0
      });
    }).catch(() => {
      updateOwnerUnitBedroomsStore({
        deleting: 0
      });
    });
  }

  render() {
    let { bedrooms, isFetching, error, history, deleting } = this.props;
    let baseUrlPath = history.location.pathname;
    // console.log(bedrooms);
    return (
      <div>
        <div className="">
          {(() => {
            if(isFetching || !bedrooms){
              return (
                <Loading loading />
              );
            }else{
              return (
                <div>
                  <div className="bedrooms">
                    <div className="clearfix margin-bottom-md">
                      <div className="pull-right text-right">
                        <Link to={`${baseUrlPath}/add`} className="btn btn-primary"><FontIcon name="plus" /> Bedroom</Link>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>King</th>
                            <th>Queen</th>
                            <th>Double</th>
                            <th>Twin Single</th>
                            <th>Child Bed</th>
                            <th>Crib</th>
                            <th>Sleep Sofa</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bedrooms.map((bedroom, index) => {
                            return (
                              <tr key={index}>
                                <Bedroom
                                  bedroom={bedroom}
                                  index={index}
                                  deleting={deleting}
                                  baseUrlPath={baseUrlPath}
                                  deleteBedroom={this.deleteBedroom}
                                />
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Route
                    path={`/dashboard/units/:id/bedrooms/add`}
                    component={EditRoom}
                    />
                  <Route
                    path={`/dashboard/units/:id/bedrooms/edit/:roomId`}
                    component={EditRoom}
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

Bedrooms.propTypes = {
  getOwnerUnitBedrooms: PropTypes.func,
  updateOwnerUnitBedrooms: PropTypes.func,
  bedrooms: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  match: PropTypes.object,
  deleteOwnerUnitBedrooms: PropTypes.func,
  history: PropTypes.object,
  updateOwnerUnitBedroomsStore: PropTypes.func,
  deleting: PropTypes.number
};

export default Bedrooms;
