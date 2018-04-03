import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';

class MyInput extends React.Component {
  render() {
    let props = this.props;
    let {
      name,
      title,
      type,
      error,
      isChanged,
      isUsed,
      left,
      center,
      right,
      help,
      description,
      className,
      validations,
      value,
      // ...otherProps
    } = props;
    let otherProps = {
      maxLength: props.maxLength,
      minLength: props.minLength,
      maxValue: props.maxValue,
      minValue: props.minValue,
      passwordkey: props.passwordkey
    };
    for(let key in otherProps){
      if(!otherProps[key]){
        delete otherProps[key];
      }
    }
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
          <Input
            className={className}
            placeholder={title}
            name={name}
            type={type}
            isChanged={isChanged}
            isUsed={isUsed}
            validations={validations}
            id={name}
            value={value}
            {...otherProps}
          />
          {help ? (
            <div className="help text-primary">
              <small>{help}</small>
            </div>
          ) : null}
        </div>
        {(right && description) ? (
          <div
            className={`${rightClass} text-info`}
            style={{fontSize: '1.05em', marginTop: '3px'}}>{description}</div>
        ) : null}
      </div>
    );
  }
}

MyInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  validations: PropTypes.array,
  left: PropTypes.number.isRequired,
  center: PropTypes.number.isRequired,
  right: PropTypes.number,
  help: PropTypes.string,
  description: PropTypes.string
};

MyInput.defaultProps = {
  left: 3,
  center: 9,
  right: 0,
  className: '',
  type: 'text'
};

export default MyInput;
