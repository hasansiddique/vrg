import React from 'react';
import OriginalBreadCrumb from '../../common/components/breadcrumb';

export default class BreadCrumb extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      path: ''
    };
  }

  componentDidMount(){
    let { initiateGetUnitBreadcrumb, propertyDetails } = this.props;
    initiateGetUnitBreadcrumb({
      GID: propertyDetails.globalDestinationId
    });
  }

  componentWillReceiveProps(props){
    this.buildPath(props.breadcrumb.breadcrumb);
  }

  buildPath(breadcrumb = []){
    if(breadcrumb.length){
      breadcrumb.splice(breadcrumb.length - 1, 1);
      let path = breadcrumb.map((value, index) => {
        for(let prop in value){
          return value[prop];
        }
      });
      if(path.length){
        this.setState({
          path: path.join('/')
        });
      }
    }
  }

  render() {
    let { path } = this.state;
    return (
      <div className="property-breadcrumb">
        <OriginalBreadCrumb path={path}/>
      </div>
    );
  }
}
