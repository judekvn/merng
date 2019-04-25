// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import s from './Login.css';
import LoginForm from '../../components/LoginForm';
import history from '../../history';
import { userLogin } from '../../actions/user';

type PropTypes = {|
  title: string,
  mutate: Function,
  store: Object,
|};

class Login extends React.Component<PropTypes> {
  state = { error: '' };

  submit = async values => {
    const { email, password } = values;

    const response = await this.props.mutate({
      variables: { email, password },
    });

    const { success, user, error } = response.data.databaseLoginUser;

    if (success) {
      this.props.store.dispatch(userLogin(user));
      history.push('/');
    } else {
      this.setState({ error });
    }
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <div className={s.formGroup}>
            <a className={s.facebook} href="/login/facebook">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z" />
              </svg>
              <span>Log in with Facebook</span>
            </a>
          </div>
          <strong className={s.lineThrough}>OR</strong>
          <LoginForm
            onSubmit={this.submit}
            submissionError={this.state.error}
          />
        </div>
      </div>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    databaseLoginUser(email: $email, password: $password) {
      success
      error
      user {
        _id
        email
      }
    }
  }
`;

const loginWithData = graphql(loginMutation)(Login);

export default withStyles(s)(loginWithData);
