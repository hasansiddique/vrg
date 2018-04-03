import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
  static get propTypes(){
    return {
      msg: PropTypes.string,
      code: PropTypes.number
    };
  }

  static get defaultProps(){
    return {
      msg: 'Something went wrong',
      code: 400
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { msg, code } = this.props;
    return (
      <div className="error-page">
        <div style={{ padding: '30px', border: 'solid 1px #dddddd' }}>
          <div className="text-danger text-center" style={{ fontSize: '3em' }}>{msg}</div>
        </div>
      </div>
    );
  }
}
