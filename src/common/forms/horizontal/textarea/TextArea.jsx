import React from 'react';
import PropTypes from 'prop-types';
import TextArea from 'react-validation/build/textarea';

class MyTextArea extends React.Component {
  render(){
    let props = this.props;
    let {
      name,
      title,
      error,
      isChanged,
      isUsed,
      left,
      center,
      right,
      help,
      description,
      className,
      rows,
      validations,
      value,
      maxLength
      //...otherProps
    } = props;
    let leftClass = `col-sm-${left}`;
    let centerClass = `col-sm-${center}`;
    let rightClass = `col-sm-${right}`;
    className = (!className) ? 'form-control' : `form-control ${className}`;
    return (
      <div className="form-group">
        {(() => {
          if(left){
            return (
              <label htmlFor={name} className={leftClass}>{title}</label>
            );
          }
        })()}
        <div className={centerClass}>
          <TextArea
            className={className}
            placeholder={title}
            name={name}
            isChanged={isChanged}
            isUsed={isUsed}
            validations={validations}
            id={name}
            rows={rows}
            value={value}
            maxLength={maxLength}
            //{...otherProps}
          />
          {help ? (
            <div className="help text-primary">
              <small>{help}</small>
            </div>
          ) : null}
        </div>
        {(right && description) ? (
          <label className={rightClass} style={{ textAlign: 'left' }}>{description}</label>
        ) : null}
      </div>
    );
  }
}

MyTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  validations: PropTypes.array,
  left: PropTypes.number.isRequired,
  center: PropTypes.number.isRequired,
  right: PropTypes.number,
  help: PropTypes.string,
  description: PropTypes.string
};

MyTextArea.defaultProps = {
  left: 3,
  center: 9,
  right: 0,
  className: '',
  rows: 5
};

export default MyTextArea;
