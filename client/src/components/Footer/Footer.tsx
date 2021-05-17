import React from 'react';
//import PropTypes from 'prop-types';
import classes from './Footer.module.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className={classes.container}>
      <div className={classes.wrapper}>© GameChat 2021 All rights reserved</div>
    </footer>
  );
};

export default Footer;
