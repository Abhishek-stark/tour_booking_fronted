import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../reducers/authSlice';
import Error from './Error';
import './style.css';
const RegisterN = () => {
  const [visible, setvisible] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      <Error />;
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setvisible(false);
    }, 3000);
  }, []);

  const Onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const OnSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        passwordConfirm,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return console.log('loading');
  }
  return (
    <div>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Create your Account</h2>
          <form className="form form--login" onSubmit={OnSubmit}>
            <div className="form__group">
              <label className="form__label">Enter Name</label>
              <input
                className="form__input"
                id="name"
                type="text"
                placeholder="Enter your Name"
                required
                name="name"
                value={name}
                onChange={Onchange}
              />
            </div>
            <div className="form__group">
              <label className="form__label">Email address</label>
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
              <label className="form__label">Password</label>
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
            <div className="form__group ma-bt-md">
              <label className="form__label">Confirm Password</label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="Confirm Password"
                required
                min={8}
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={Onchange}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Register</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterN;
