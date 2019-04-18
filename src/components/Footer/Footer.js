import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Footer.css';
import Link from '../Link';

const Footer = () => (
  <div className={s.root}>
    <div className={s.container}>
      <span className={s.text}>© {new Date().getFullYear()} Alexey Kutalo</span>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/">
        Home
      </Link>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/admin">
        Admin
      </Link>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/privacy">
        Privacy
      </Link>
    </div>
  </div>
);

export default withStyles(s)(Footer);
