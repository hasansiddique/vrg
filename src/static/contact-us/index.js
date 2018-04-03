import {connect} from 'react-redux';

import ContactUs from './ContactUs.jsx';
import {
  sendMessage
} from './contact-us.actions';

const mapStateToProps = state => ({});
const mapDispatchToProps = () => {
  return  {
    sendMessage: (params) => sendMessage(params)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
