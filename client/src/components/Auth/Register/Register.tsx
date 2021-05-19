import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import classes from '../Auth.module.scss';
import { ReactComponent as ControllerPS1 } from '../../../images/controller-playstation-01.svg';
import { ReactComponent as ControllerPS2 } from '../../../images/controller-playstation-02.svg';
import { ReactComponent as ControllerPS3 } from '../../../images/controller-playstation-03.svg';
import { ReactComponent as ControllerXbox } from '../../../images/controller-xbox.svg';

import { useAppDispatch } from '../../../hooks/redux';
import { register } from '../../../store/reducers/auth';
import { useHistory } from 'react-router';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { fetchAllSupportedLanguage } from '../../../services/auth.service';
import { Link } from 'react-router-dom';

const Register = (): JSX.Element => {
  const initialUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    language: string;
  } = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    language: 'EN',
  };

  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState({ message: '', type: '' });
  const [arrayLanguages, setArrayLanguages] = useState([
    { name: '', language: '' },
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchSupportedLanguage();
  }, []);

  const fetchSupportedLanguage = async () => {
    const arrayLang = await fetchAllSupportedLanguage('FR');
    setArrayLanguages(arrayLang);
  };

  const history = useHistory();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    for (const [key, value] of Object.entries(user)) {
      isValid = isValid && !!value;
      console.log(key, isValid);
    }

    if (isValid) {
      dispatch(register({ ...user, id: 0 }));
      setUser(initialUser);
      setError({ message: '', type: '' });
      history.push('/auth/login');
    } else {
      setError({
        message: 'Please insert the required fields',
        type: 'Register',
      });
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((previousUser) => ({ ...previousUser, [name]: value }));
  };

  const selectHandler = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const value = e.target.value;
    const language = value as string;
    setUser((previousUser) => ({ ...previousUser, language }));
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
            label="First name"
            name="firstName"
            onChange={changeHandler}
          />
          <TextField
            className={classes.field__container}
            id="standard-basic"
            label="Last name"
            name="lastName"
            onChange={changeHandler}
          />
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
            type="password"
            name="password"
            onChange={changeHandler}
          />

          <div className={classes.field__container}>
            <InputLabel id="select-label">Language</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={user.language}
              name="language"
              onChange={selectHandler}
            >
              {arrayLanguages.map((lang) => (
                <MenuItem key={lang.language} value={lang.language}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          {error.message && <p className={classes.error}>{error.message}</p>}
          <button className={classes.btn} type="submit">
            Register
          </button>
          <Link className={classes.link} to="login">
            Go to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
