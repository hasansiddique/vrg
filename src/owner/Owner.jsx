import React from 'react';

export default class Owner extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let { getOwner } = this.props;
    let ownerId = this.props.match.params.ownerId;
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        Will display the owner page
      </div>
    );
  }
}
