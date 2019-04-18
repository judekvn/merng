// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Register.css';

type PropTypes = {|
  title: string,
|};

class Register extends React.Component<PropTypes> {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
