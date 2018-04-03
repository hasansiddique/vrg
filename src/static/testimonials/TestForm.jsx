import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';

const MyInnerForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: 'block' }}>
        Email
      </label>
      <input 
        type="text"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.email && touched.email ? 'text-input error' : 'text-input'}
      />
      {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
              .email('Invalid email address')
              .required('Email is required')
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 4000);
  },
  displayName: 'BasicForm'
})(MyInnerForm);

export default class TestForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <EnhancedForm />
      </div>
    );
  }
}
