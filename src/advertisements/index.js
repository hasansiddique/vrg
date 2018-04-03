import {connect} from 'react-redux';

import {
  getAdvertisements
} from './advertisements.action';
import Advertisements from './Advertisements.jsx';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  // getAdvertisements: (params) => dispatch(getAdvertisements(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertisements);
