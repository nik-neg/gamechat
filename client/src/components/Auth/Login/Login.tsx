import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import classes from '../Auth.module.scss';
import { ReactComponent as ControllerPS1 } from '../../../images/controller-playstation-01.svg';
import { ReactComponent as ControllerPS2 } from '../../../images/controller-playstation-02.svg';
import { ReactComponent as ControllerPS3 } from '../../../images/controller-playstation-03.svg';
import { ReactComponent as ControllerXbox } from '../../../images/controller-xbox.svg';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login } from '../../../store/reducers/auth';
import { useHistory } from 'react-router';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login = (): JSX.Element => {
  const initialUser: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialUser);

  const dispatch = useAppDispatch();

  const history = useHistory();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email && user.password) {
      await dispatch(login(user));
      history.push('/home');
    }
    setUser(initialUser);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((previousUser) => ({ ...previousUser, [name]: value }));
  };

  return (
    <div className={classes.container}>
      <ControllerPS1 className={classes.image} id={classes['ctr-ps-1']} />
      <ControllerPS2 className={classes.image} id={classes['ctr-ps-2']} />
      <ControllerPS3 className={classes.image} id={classes['ctr-ps-3']} />
      <ControllerXbox className={classes.image} id={classes['ctr-xbox']} />
      <div className={classes.form__container}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <TextField
            className={classes.field__container}
            id="standard-basic"
            label="Email"
            name="email"
            onChange={changeHandler}
          />
          <TextField
            className={classes.field__container}
            id="filled-basic"
            label="Password"
            name="password"
            type="password"
            onChange={changeHandler}
          />
          <button className={classes.btn} type="submit">
            Login
          </button>
          <Link className={classes.link} to="register">
            Go to Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
