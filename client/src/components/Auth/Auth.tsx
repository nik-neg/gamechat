import React from 'react';
import classes from './Auth.module.scss';
import { ReactComponent as ControllerPS1 } from '../../images/controller-playstation-01.svg';
import { ReactComponent as ControllerPS2 } from '../../images/controller-playstation-02.svg';
import { ReactComponent as ControllerPS3 } from '../../images/controller-playstation-03.svg';
import { ReactComponent as ControllerXbox } from '../../images/controller-xbox.svg';
import { Link } from 'react-router-dom';

import logo from '../../images/gamechat_round.png';

const Auth = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <ControllerPS1 className={classes.image} id={classes['ctr-ps-1']} />
      <ControllerPS2 className={classes.image} id={classes['ctr-ps-2']} />
      <ControllerPS3 className={classes.image} id={classes['ctr-ps-3']} />
      <ControllerXbox className={classes.image} id={classes['ctr-xbox']} />
      <div className={classes.avatar__container}>
        <img className={classes.avatar__logo} src={logo} alt="avatar" />
      </div>
      <div className={classes['links-container']}>
        <Link className={classes.link} to="auth/login">
          Login
        </Link>
        <Link className={classes.link} to="auth/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Auth;
