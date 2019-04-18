// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Contact.css';

type PropTypes = {|
  title: string,
|};

class Contact extends React.Component<PropTypes> {
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

export default withStyles(s)(Contact);
