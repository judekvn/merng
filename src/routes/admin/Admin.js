// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Admin.css';

type PropTypes = {|
  title: string,
|};

class Admin extends React.Component<PropTypes> {
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

export default withStyles(s)(Admin);
