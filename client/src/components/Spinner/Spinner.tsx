import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.loading}></div>
    </div>
  );
};

export default Spinner;
