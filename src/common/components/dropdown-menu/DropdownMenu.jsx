import React from 'react';
import FontIcon from 'common/components/font-icon';

export default class DropdownMenu extends React.Component {

  static get defaultProps(){
    return {
      icon: 'angle-down',
      title: 'Button'
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.mouseInside = false;
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.mouseInMenu = this.mouseInMenu.bind(this);
    this.mouseOutsideMenu = this.mouseOutsideMenu.bind(this);
  }

  openMenu(){
    this.setState({
      open: true
    });
  }

  closeMenu(e){
    if(this.mouseInside == false){
      this.setState({
        open: false
      });
    }
  }

  mouseInMenu(){
    this.mouseInside = true;
  }

  mouseOutsideMenu(){
    this.mouseInside = false;
  }

  render() {
    let { title, icon } = this.props;
    let { open } = this.state;
    let dropdownClass = 'dropdown btn-group';
    if(open){
      dropdownClass += ' open';
    }
    return (
      <div className={dropdownClass}>
        <button 
          onFocus={this.openMenu} 
          onBlur={this.closeMenu} 
          className="dropdown-toggle btn btn-default">
          {title} <FontIcon name={icon} />
        </button>
        <ul 
          className="dropdown-menu dropdown-menu-right" 
          onMouseEnter={this.mouseInMenu} 
          onMouseLeave={this.mouseOutsideMenu}
          onClick={() => {
            this.mouseOutsideMenu();
            this.closeMenu();
          }}>
          <li>
            {this.props.children}
          </li>
        </ul>
      </div>
    );
  }
}
