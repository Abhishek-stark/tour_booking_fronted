import { useState, useEffect } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, getAllusers } from '../reducers/authSlice';
import Loading from './Loading';
import Error from './Error';

function Login() {
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

  const onChange = (e) => {
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
    <>
      {errorshow ? (
        <h2 className="alert__class">You Entered wrong credential !</h2>
      ) : null}
      <section className="main_form">
        <form className="left_form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit{' '}
            </button>{' '}
          </div>{' '}
        </form>{' '}
      </section>{' '}
    </>
  );
}

export default Login;
