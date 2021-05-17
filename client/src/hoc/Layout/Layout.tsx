import React from 'react';
import PropTypes from 'prop-types';

import classes from './Layout.module.scss';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/ProfileBar/ProfileBar';

const Layout = ({ children }: any): JSX.Element => {
  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.children}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
