import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontIcon from 'common/components/font-icon';

export default class Bedroom extends React.Component {
  static get propTypes(){
    return {
      bedroom: PropTypes.object,
      index: PropTypes.number.isRequired,
      deleting: PropTypes.number.isRequired,
      baseUrlPath: PropTypes.string.isRequired,
      deleteBedroom: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.deleteBedroom = this.deleteBedroom.bind(this);
  }

  componentDidMount(){
    // console.log('here');
  }

  deleteBedroom(){
    let { bedroom, index, deleteBedroom } = this.props;
    deleteBedroom(bedroom, index);
  }

  render() {
    let { bedroom, index, deleting, baseUrlPath } = this.props;
    if(!bedroom){
      return (
        <div>No Bedroom</div>
      );
    }
    return (
      <Fragment>
        <td>{bedroom.title}</td>
        <td>{bedroom.king}</td>
        <td>{bedroom.queen}</td>
        <td>{bedroom.double}</td>
        <td>{bedroom.twin_single}</td>
        <td>{bedroom.child_bed}</td>
        <td>{bedroom.crib}</td>
        <td>{bedroom.sleep_sofa}</td>
        <td>
          <div className="btn-group">
            <Link className="btn-block" to={`${baseUrlPath}/edit/${bedroom.id}`}><FontIcon name="edit" /> Edit</Link>
            <a 
              href="javascript:;" 
              className="btn-block text-danger" 
              onClick={this.deleteBedroom}>
              <FontIcon name="trash" /> {(deleting === bedroom.id) ? 'Deleting...' : 'Delete'}
            </a>
          </div>
        </td>
      </Fragment>
    );
  }
}
