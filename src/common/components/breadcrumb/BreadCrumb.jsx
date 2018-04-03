import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {getSvg} from '../../svg-icons/index';

export default class BreadCrumb extends React.PureComponent {

  static get propTypes(){
    return {
      path: PropTypes.string
    };
  }

  static get defaultProps(){
    return {
      path: null
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount(){
    this.buildBreadcrumb(this.props.path);
  }

  componentWillReceiveProps(newProps){
    this.buildBreadcrumb(newProps.path);
  }

  buildBreadcrumb(path){
    let links = [];
    path = decodeURI(path.toLowerCase());
    if(path){
      let baseUrl = '';
      links = path.split('/');
      links = links.map((link, index) => {
        let obj = {
          name: link.replace(/-/ig, ' '),
          value: `${baseUrl}/${link.replace(/\s/ig, '-')}`
        };
        baseUrl = obj.value;
        return obj;
      });
      this.setState({
        links: links
      });
    }
  }

  render() {
    let { links } = this.state;
    return (
      <div className="breadcrumbs">
        <ul>
          <li>
            <span className="svg-icon">
              {getSvg('navigation', 22, 22, '#0074e1')}
            </span>
            <Link to={`/`}>Home</Link>
          </li>
          {links.map((link, index) => {
            return (
              <li key={index}>
                {(() => {
                  if(index == links.length -1){
                    return (
                      <Link className="active" to={`/destination${link.value}`}>{link.name}</Link>
                    );
                  }else{
                    return (
                      <Link to={`/destination${link.value}`}>{link.name}</Link>
                    );
                  }
                })()}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
