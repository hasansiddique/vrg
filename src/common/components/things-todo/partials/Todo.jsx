import React from 'react';

export default class Todo extends React.PureComponent {

  constructor(props) {
    super(props);
    this.countAd = this.countAd.bind(this);
  }

  countAd(){
    let { countAdClick, todo } = this.props;
    countAdClick(todo.id);
  }

  render() {
    let { todo, adImagesBaseUrl } = this.props;
    return (
      <div className="todo">
        <a href={todo.website_url} onClick={this.countAd} target="_blank">
          <div className="dir-hli-5">
            <div className="dir-hli-1">
              <img src={adImagesBaseUrl + todo.picture} alt={todo.caption}/></div>
            <div className="dir-hli-2 title"><h4>{todo.caption}</h4></div>
          </div>
        </a>
      </div>
    );
  }
}
