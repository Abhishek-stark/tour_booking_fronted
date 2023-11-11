import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'
// import { FaUser } from 'react-icons/fa';
import './register.css';
import { register, reset } from '../reducers/authSlice';
import Error from './Error';

function Register() {
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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
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
    <>
      <section className="register_form">
        <form onSubmit={onSubmit}>
          <div className="register_form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="register_form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="register_form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="register_form-group">
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="Confirm password"
              onChange={onChange}
            />{' '}
          </div>{' '}
          <div className="register_form-group">
            <button type="submit" className="register_btn btn-block">
              Submit{' '}
            </button>{' '}
          </div>{' '}
        </form>{' '}
      </section>{' '}
    </>
  );
}

export default Register;
