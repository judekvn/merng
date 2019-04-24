// @flow

import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Register.css';
import RegisterForm from '../../components/RegisterForm';
import history from '../../history';

type PropTypes = {|
  title: string,
  mutate: Function,
|};

class Register extends React.Component<PropTypes> {
  state = { error: '' };

  submit = async values => {
    const { email, password } = values;

    const response = await this.props.mutate({
      variables: { email, password },
    });

    const { success, user, error } = response.data.databaseCreateUser;

    if (success) {
      console.log(user);
      history.push('/login');
    } else {
      this.setState({ error });
    }
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <RegisterForm
            onSubmit={this.submit}
            submissionError={this.state.error}
          />
        </div>
      </div>
    );
  }
}

const signUpMutation = gql`
  mutation($email: String!, $password: String!) {
    databaseCreateUser(email: $email, password: $password) {
      success
      error
      user {
        _id
        email
      }
    }
  }
`;

const signUpWithData = graphql(signUpMutation)(Register);

export default withStyles(s)(signUpWithData);
