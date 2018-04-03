import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PageWrapper from'common/layout/page-wrapper';
import Loading from 'common/components/loading';
import ApprovalForm from './ApprovalForm.jsx';
import DenialForm from './DenialForm.jsx';


// http://localhost:8080/approval/booking?key=a4P0CNIlxOwO77DPqEH+jlQKQa+RfOVVcah/lmLQ0JmT&action=confirm

export default class BookingApproval extends React.Component {
  static get propTypes(){
    return {
      history: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      action: null,
      key: null,
      errors: [],
      denied: false,
      confirmed: false
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
  }

  componentWillMount(){
    let { history } = this.props;
    let getParams = queryString.parse(history.location.search);
    let { action, key } = getParams;
    if(!action || !key){
      this.setState({
        redirect: true
      });
    }
    if(action != 'confirm' && action != 'deny'){
      this.setState({
        redirect: true
      });
    }
    this.setState({
      action: action,
      key: key
    });
  }

  componentDidMount(){
    
  }

  handleConfirm(values, setSubmitting){
    let { confirmDenyBooking } = this.props;
    let { key } = this.state;
    let params = {
      signature: values.signature,
      comments: values.comments,
      action: key
    };
    confirmDenyBooking(params).then((res) => {
      setSubmitting(false);
      if(res.status == false){
        this.setState({
          errors: res.errmsgs
        });
      }else{
        this.setState({
          confirmed: true
        });
      }
    }).catch(() => {
      setSubmitting(false);
    });
  }

  handleDeny(values, setSubmitting){
    let { confirmDenyBooking } = this.props;
    let { key } = this.state;
    let params = {
      signature: values.signature,
      comments: values.comments,
      action: key
    };
    confirmDenyBooking(params).then((res) => {
      setSubmitting(false);
      if(res.status == false){
        this.setState({
          errors: res.errmsgs
        });
      }else{
        this.setState({
          denied: true
        });
      }
    }).catch(() => {
      setSubmitting(false);
    });
  }

  render() {
    let { isMobile } = this.props;
    let { redirect, action, key, errors, denied, confirmed } = this.state;
    if(redirect){
      return (
        <Redirect to="/" />
      );
    }
    return (
      <PageWrapper>
        <div className="container margin-top-lg">
          {(!key || !action) && (
            <Loading loading />
          )}
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              {(() => {
                if(errors.length){
                  return (
                    <div className="alert alert-danger">
                      {errors.map((error, index) => {
                        return (
                          <div key={index}>
                            {error}
                          </div>
                        );
                      })}
                    </div>
                  );
                }else if(denied){
                  return (
                    <div className="alert alert-success">
                      Denied Successfully
                    </div>
                  );
                }else if(confirmed){
                  return (
                    <div className="alert alert-success">
                      Approved Successfully
                    </div>
                  );
                }
              })()}
              {(() => {
                if(action == 'confirm'){
                  return (
                    <div className="panel panel-success">
                      <div className="panel-heading">Confirm Booking</div>
                      <div className="panel-body">
                        <ApprovalForm handleSubmit={this.handleConfirm} />
                      </div>
                    </div>
                  );
                }else{
                  return (
                    <div className="panel panel-danger">
                      <div className="panel-heading">Deny Booking</div>
                      <div className="panel-body">
                        <DenialForm handleSubmit={this.handleDeny} isMobile={isMobile} />
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
