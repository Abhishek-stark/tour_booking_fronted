import { React, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, logout } from '../reducers/authSlice';
import axios from 'axios';
import Error from './Error';
import './homepage.css';
import Loading from './Loading';
import Tourdetailpage from './Tourdetailpage';
const Homepage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [state, setstate] = useState(false);
  const tourdetail = JSON.parse(localStorage.getItem('tourdetail'));
  const navigate = useNavigate();
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  // const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const detail = location.pathname;
    if (detail === '/tourdetail') {
      setstate(true);
      // Tourname = tourdetail.tour.name;
    }
    // if (detail === '/admin') {
    //   Tourname = 'All Users';
    // }
    if (detail === '/') {
      setstate(false);
    }

    if (isLoading) {
      <Loading />;
    }
    if (isError) {
      <Error />;
    }
    if (isSuccess) {
      // if (user) navigate('/tours');
      if (user) console.log('change here in homepage jsx');
      else navigate('/login');
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate]);
  const OnLogout = (e) => {
    e.preventDefault();

    dispatch(logout());

    dispatch(reset());
  };
  const OnLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  const Onregister = (e) => {
    e.preventDefault();
    navigate('/register');
  };
  var Tourname = 'All Tours';
  const detail = location.pathname;
  if (tourdetail) {
    if (detail === '/tourdetail') {
      Tourname = tourdetail.tour.name;
    }
  }

  // if(detail === "/"){
  //   Tourname = "All Tours"
  // }
  return (
    <>
      <div className="homepage_class">
        <nav nav_bar className="nav_container">
          <div className="left_nav">
            {!(state && tourdetail) ? <h2>All Tours</h2> : <h2>{Tourname}</h2>}
          </div>{' '}
          <div className="right_nav">
            <ul>
              {' '}
              {user ? (
                <>
                  <li>
                    <button className="nav_logout_button" onClick={OnLogout}>
                      Logout{' '}
                    </button>{' '}
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <img src={user.photo} alt="dashboardLink" />
                    </Link>{' '}
                  </li>{' '}
                </>
              ) : (
                <>
                  <li>
                    <button className="nav_login_button" onClick={OnLogin}>
                      Login{' '}
                    </button>{' '}
                  </li>{' '}
                  <li>
                    <button
                      className="nav_register_button"
                      onClick={Onregister}
                    >
                      Register{' '}
                    </button>{' '}
                  </li>{' '}
                </>
              )}{' '}
            </ul>{' '}
          </div>{' '}
        </nav>{' '}
      </div>{' '}
    </>
  );
};

export default Homepage;
