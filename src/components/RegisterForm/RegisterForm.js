// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './RegisterForm.css';
import validate from './validate';

type PropTypes = {|
  handleSubmit: Function,
|};

const RegisterForm = ({ handleSubmit }: PropTypes) => (
  <form onSubmit={handleSubmit}>
    <div className={s.formGroup}>
      <label className={s.label} htmlFor="email">
        Email address:
        <Field
          className={s.input}
          id="email"
          type="text"
          component="input"
          name="email"
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
      </label>
    </div>
    <div className={s.formGroup}>
      <label className={s.label} htmlFor="password">
        Password:
        <Field
          className={s.input}
          id="password"
          type="password"
          name="password"
          component="input"
        />
      </label>
    </div>
    <div className={s.formGroup}>
      <label className={s.label} htmlFor="confirmPassword">
        Confirm Password:
        <Field
          className={s.input}
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          component="input"
        />
      </label>
    </div>
    <div className={s.formGroup}>
      <button className={s.button} type="submit">
        Register
      </button>
    </div>
  </form>
);

export default reduxForm({
  form: 'RegisterForm',
  validate,
})(withStyles(s)(RegisterForm));
