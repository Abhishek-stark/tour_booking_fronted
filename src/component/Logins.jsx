import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, getAllusers } from '../reducers/authSlice';
import './style.css';
import Loading from './Loading';
const Logins = () => {
  const [errorshow, seterrorshow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // seterrorshow(true);

      seterrorshow(true);
    }

    if (isSuccess) {
      navigate('/');
    }

    if (user && user.role === 'admin') {
      navigate('/admin');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const Onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    setTimeout(() => {
      seterrorshow(false);
    }, 2000);
  };

  if (isLoading) {
    <Loading />;
  }
  const sendpasswordReset = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/forgotPassword',
        email
      );

      // window.location.reload();
      return response;
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <div>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form form--login" onSubmit={onSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                name="email"
                value={email}
                onChange={Onchange}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required
                min={8}
                name="password"
                value={password}
                onChange={Onchange}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Logins;
