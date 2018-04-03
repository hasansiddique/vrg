import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontIcon from 'common/components/font-icon';

export default class Bathroom extends React.Component {
  static get propTypes(){
    return {
      bathroom: PropTypes.object,
      index: PropTypes.number.isRequired,
      deleting: PropTypes.number.isRequired,
      baseUrlPath: PropTypes.string.isRequired,
      deleteBathroom: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.deleteBathroom = this.deleteBathroom.bind(this);
  }

  deleteBathroom(){
    let { bathroom, index, deleteBathroom } = this.props;
    deleteBathroom(bathroom, index);
  }

  render() {
    let { bathroom, deleting, baseUrlPath } = this.props;
    if(!bathroom){
      return (
        <div>No Bathroom</div>
      );
    }
    return (
      <Fragment>
        <td>{bathroom.title}</td>
        <td>{bathroom.type_of_bath.replace('_', ' ')}</td>
        <td>{bathroom.toilet}</td>
        <td>{bathroom.combo_tub_shower}</td>
        <td>{bathroom.tub}</td>
        <td>{bathroom.shower}</td>
        <td>{bathroom.jetted_tub}</td>
        <td>{bathroom.bidet}</td>
        <td>{bathroom.outdoor_shower}</td>
        <td>
          <div className="btn-group">
            <Link className="btn-block" to={`${baseUrlPath}/edit/${bathroom.id}`}><FontIcon name="edit" /> Edit</Link>
            <a 
              href="javascript:;" 
              className="btn-block text-danger" 
              onClick={this.deleteBathroom}>
              <FontIcon name="trash" /> {(deleting === bathroom.id) ? 'Deleting...' : 'Delete'}
            </a>
          </div>
        </td>
      </Fragment>
    );
  }
}
